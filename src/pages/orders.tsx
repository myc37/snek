import { type NextPage } from "next";
import Parcel from "~/components/Parcel";
import { BiCamera, BiSortAlt2, BiFilter } from "react-icons/bi";
import { generateFilterParcel, generateParcels } from "~/utils/parcels";
import { type ChangeEvent, useState } from "react";
import AppBar from "~/components/AppBar";
import FullScreenContainer from "~/components/FullScreenContainer";
import ScanningQr from "~/components/ScanningQr";
import { type Filter } from "~/types/filter";
import { initUncheckedFilter } from "~/utils/filter";
import FilterModal from "~/components/FilterModal";

const Orders: NextPage = () => {
  const [search, setSearch] = useState("");
  const [isScanningQr, setIsScanningQr] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>(initUncheckedFilter());
  const parcels = generateParcels(20);

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleOpenScanQr = () => {
    setIsScanningQr(true);
  };

  const handleCloseScanQr = () => {
    setIsScanningQr(false);
  };

  const handleOpenFilter = () => {
    setIsFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  const applyFilters = (newFilter: Filter) => {
    setFilter(newFilter);
    handleCloseFilter();
  };

  const handleScan = (trackingNumber: string) => {
    if (!trackingNumber) return;
    setSearch(trackingNumber);
    handleCloseScanQr();
  };

  const filteredParcels = parcels.filter(generateFilterParcel(search, filter));

  return (
    <>
      <ScanningQr
        isOpen={isScanningQr}
        handleCloseScanQr={handleCloseScanQr}
        handleScan={handleScan}
      />
      <FilterModal
        isOpen={isFilterOpen}
        handleClose={handleCloseFilter}
        filter={filter}
        applyFilters={applyFilters}
      />
      <AppBar />
      <FullScreenContainer>
        <div className="text-2xl font-bold">Today&apos;s parcels</div>
        <div className="my-4 flex gap-2">
          <button
            className="flex items-center gap-2 rounded-md bg-primary py-1 px-3 text-gray-1"
            onClick={handleOpenScanQr}
          >
            <BiCamera />
            Scan
          </button>

          <button
            className="ml-auto flex items-center gap-2 rounded-md bg-primary py-1 px-3 text-gray-1"
            onClick={handleOpenFilter}
          >
            <BiFilter />
            Filter
          </button>
        </div>
        <input
          value={search}
          onChange={handleChangeSearch}
          className="mb-2 w-full rounded-md border-2 border-primary px-4 py-2"
          placeholder="Search..."
        />
        <div className="mb-4 text-sm text-gray-500">{`${
          filteredParcels.length
        } parcel${filteredParcels.length !== 1 ? "s" : ""} found`}</div>
        <div className="flex flex-col gap-3">
          {filteredParcels.map((parcel) => (
            <Parcel key={parcel.trackingNumber} parcel={parcel} />
          ))}
        </div>
      </FullScreenContainer>
    </>
  );
};

export default Orders;
