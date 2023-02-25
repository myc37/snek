import { type NextPage } from "next";
import Container from "~/components/Container";
import Parcel from "~/components/Parcel";
import { BiCamera, BiSortAlt2, BiFilter } from "react-icons/bi";
import { api } from "~/utils/api";
import { generateParcels } from "~/utils/parcels";
import { ChangeEvent, useState } from "react";

const Orders: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [search, setSearch] = useState("");

  const parcels = generateParcels(3);

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Container className="min-h-screen py-4">
      <div className="text-2xl font-bold">Today&apos;s parcels</div>
      <div className="my-4 flex gap-2">
        <button className="flex items-center gap-2 rounded-md bg-primary py-1 px-3 text-gray-1">
          <BiCamera />
          Scan
        </button>

        <button className="ml-auto flex items-center gap-2 rounded-md bg-primary py-1 px-3 text-gray-1">
          <BiSortAlt2 />
          Sort
        </button>
        <button className="flex items-center gap-2 rounded-md bg-primary py-1 px-3 text-gray-1">
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
      <div className="mb-4 text-sm text-gray-500">{`${parcels.length} parcel${
        parcels.length !== 1 ? "s" : ""
      } found`}</div>
      <div className="flex flex-col gap-3">
        {parcels.map((parcel) => (
          <Parcel key={parcel.trackingNumber} parcel={parcel} />
        ))}
      </div>
    </Container>
  );
};

export default Orders;
