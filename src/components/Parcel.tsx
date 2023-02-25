import { type FC, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { BiCamera, BiChevronDown, BiFlag, BiPen } from "react-icons/bi";
import Signing from "./Signing";
import Contactless from "./Contactless";
import ReportIssue from "./ReportIssue";
import { type DeliveryType, type Parcel, type Size } from "@prisma/client";

type Props = { parcel: Parcel };

const ParcelComponent: FC<Props> = ({ parcel }) => {
  const [isContactlessOpen, setIsContactlessOpen] = useState(false);
  const [isSigningOpen, setIsSigningOpen] = useState(false);
  const [isReportIssueOpen, setIsReportIssueOpen] = useState(false);

  const generateTagColour = (type: DeliveryType | Size) => {
    switch (type) {
      case "CONTACTLESS": {
        return "bg-yellow-600 text-gray-1";
      }
      case "IN_PERSON": {
        return "bg-purple-600 text-gray-1";
      }
      case "RETURN": {
        return "bg-blue-600 text-gray-1";
      }
      case "XS": {
        return "bg-primary-200 text-text";
      }
      case "S": {
        return "bg-primary-400 text-gray-1";
      }
      case "M": {
        return "bg-primary-600 text-gray-1";
      }
      case "L": {
        return "bg-primary-800 text-gray-1";
      }

      default: {
        return "";
      }
    }
  };
  const handleOpenContactless = () => {
    setIsContactlessOpen(true);
  };

  const handleCloseContactless = () => {
    setIsContactlessOpen(false);
  };

  const handleOpenSigning = () => {
    setIsSigningOpen(true);
  };

  const handleCloseSigning = () => {
    setIsSigningOpen(false);
  };

  const handleOpenReportIssue = () => {
    setIsReportIssueOpen(true);
  };

  const handleCloseReportIssue = () => {
    setIsReportIssueOpen(false);
  };

  return (
    <>
      <Contactless
        isOpen={isContactlessOpen}
        handleCloseContactless={handleCloseContactless}
        parcel={parcel}
      />
      <Signing
        isOpen={isSigningOpen}
        handleCloseSigning={handleCloseSigning}
        parcel={parcel}
      />
      <ReportIssue
        isOpen={isReportIssueOpen}
        handleCloseReportIssue={handleCloseReportIssue}
        parcel={parcel}
      />
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
              <div className="flex flex-col items-start">
                <div className="font-bold">{parcel.recipientName}</div>
                <div>{parcel.address}</div>
                <div className="mt-2 flex w-full flex-wrap gap-2">
                  <div
                    className={`rounded-full ${generateTagColour(
                      parcel.type
                    )} px-2 py-1 text-sm`}
                  >
                    {parcel.type}
                  </div>

                  {parcel.isCash ? (
                    <div className="rounded-full bg-green-700 px-2 py-1 text-sm text-gray-1">
                      Cash
                    </div>
                  ) : null}

                  <div
                    className={`rounded-full ${generateTagColour(
                      parcel.size
                    )} px-2 py-1 text-sm`}
                  >
                    {parcel.size}
                  </div>
                </div>
              </div>
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
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-4 text-gray-1 shadow-md"
                    onClick={handleOpenContactless}
                  >
                    <BiCamera className="text-xl" />
                    Contactless
                  </button>
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-primary  px-4 py-4 text-gray-1 shadow-md"
                    onClick={handleOpenSigning}
                  >
                    <BiPen className="text-xl" />
                    In-person
                  </button>
                </div>
                <button
                  className="flex w-full items-center justify-center gap-2 bg-background px-2 py-1 text-primary shadow-md"
                  onClick={handleOpenReportIssue}
                >
                  <BiFlag />
                  Report issue
                </button>
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
    </>
  );
};
export default ParcelComponent;
