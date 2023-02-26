import { type NextPage } from "next";
import ParcelComponent from "~/components/Parcel";
import { BiCamera, BiFilter } from "react-icons/bi";
import { generateFilterParcel } from "~/utils/parcels";
import { type ChangeEvent, useState } from "react";
import AppBar from "~/components/AppBar";
import FullScreenContainer from "~/components/FullScreenContainer";
import ScanningQr from "~/components/ScanningQr";
import { type Filter } from "~/types/filter";
import { initUncheckedFilter } from "~/utils/filter";
import FilterModal from "~/components/FilterModal";
import { api } from "~/utils/api";
import { DUMMY_DRIVER_ID } from "~/utils/constants";
import Loading from "~/components/Loading";
import Error from "~/components/Error";

const Orders: NextPage = () => {
  const [search, setSearch] = useState("");
  const [isScanningQr, setIsScanningQr] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>(initUncheckedFilter());
  const { data: parcels, isInitialLoading: isLoading } =
    api.parcels.getNonCompletedByDriverId.useQuery({
      driverId: DUMMY_DRIVER_ID,
    });

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

  if (isLoading) {
    return <Loading />;
  } else if (parcels === undefined || true) {
    return <Error />;
  }

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
            <ParcelComponent key={parcel.trackingNumber} parcel={parcel} />
          ))}
          {parcels.length === 0 ? (
            <div className="my-10 flex flex-col items-center justify-center">
              <img
                src="/ninja-thumbs.png"
                alt="ninja thumbs up"
                className="max-w-xs pr-12"
              />
              <div className="mt-4 text-center text-lg text-primary">
                No parcels left for today. Good job!
              </div>
            </div>
          ) : null}
        </div>
      </FullScreenContainer>
    </>
  );
};

export default Orders;
