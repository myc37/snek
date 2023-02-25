import { FC } from "react";
import { Parcel } from "~/types/parcels";
import { Disclosure, Transition } from "@headlessui/react";
import { BiCamera, BiChevronDown, BiFlag, BiPen } from "react-icons/bi";

type Props = { parcel: Parcel };

const Parcel: FC<Props> = ({ parcel }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div
          className={`rounded-md border-2 bg-white px-4 transition-all ${
            open
              ? " border-primary py-4 shadow-xl"
              : "border-white py-2 shadow-md"
          }`}
        >
          <Disclosure.Button className="relative flex w-full flex-col">
            <div className="font-bold">{parcel.recipientName}</div>
            <div>{parcel.address}</div>
            <BiChevronDown
              className={`absolute top-0 bottom-0 right-0 my-auto text-2xl transition-all ${
                open ? "rotate-180" : ""
              }`}
            />
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel>
              <div className="my-4 flex gap-4">
                <button className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-4 text-gray-1 shadow-md">
                  <BiCamera className="text-xl" />
                  Contactless
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-md bg-primary  px-4 py-4 text-gray-1 shadow-md">
                  <BiPen className="text-xl" />
                  In-person
                </button>
              </div>
              <button className="flex w-full items-center justify-center gap-2 bg-background px-2 py-1 text-primary shadow-md">
                <BiFlag />
                Report issue
              </button>
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
};
export default Parcel;
