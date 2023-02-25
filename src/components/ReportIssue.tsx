/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Transition, Dialog, Listbox } from "@headlessui/react";
import { type Parcel, ParcelStatus, type FailureReason } from "@prisma/client";
import { Fragment, useState, type FC } from "react";
import { BiCheck, BiChevronDown } from "react-icons/bi";
import { api } from "~/utils/api";

type Props = {
  isOpen: boolean;
  handleCloseReportIssue: () => void;
  parcel: Parcel;
};

const ReportIssue: FC<Props> = ({ isOpen, handleCloseReportIssue, parcel }) => {
  const updateStatus = api.parcels.updateStatusByTrackingNumber.useMutation();
  const [issueReason, setIssueReason] = useState<FailureReason>("NOT_HOME");
  const [isLoading, setIsLoading] = useState(false);

  const reportIssue = () => {
    updateStatus.mutate(
      {
        trackingNumber: parcel.trackingNumber,
        status: ParcelStatus.ATTEMPTED,
      },
      {
        onSuccess: () => {
          handleCloseReportIssue();
          window.location.reload();
          setIsLoading(false);
        },
      }
    );
  };

  const closeAndReset = () => {
    setIssueReason("NOT_HOME");
    handleCloseReportIssue();
  };

  if (!isOpen) {
    return <></>;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeAndReset}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-background bg-opacity-100" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="pt-18 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 py-10 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900"
                >
                  Confirming contactless delivery
                  <div className="mt-1 text-sm text-gray-600">
                    Please take photos of the parcel, unit number, and floormat
                  </div>
                </Dialog.Title>
                <div className="my-4">
                  <Listbox
                    value={issueReason}
                    onChange={(e) => setIssueReason(e)}
                  >
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {issueReason === "NOT_HOME"
                            ? "Customer not home"
                            : "Cannot make it"}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <BiChevronDown
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          <Listbox.Option
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-primary-100 text-primary-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={"NOT_HOME"}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  Customer not home
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <BiCheck
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                          <Listbox.Option
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-primary-100 text-primary-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={"CANNOT_MAKE_IT"}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  Cannot make it
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <BiCheck
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>

                <div className="mt-4 flex w-full gap-4">
                  <button
                    className="w-full rounded-md border-2 border-primary bg-white px-4 py-2 text-primary"
                    onClick={closeAndReset}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex w-full items-center justify-center whitespace-nowrap rounded-md border-2 border-primary bg-primary px-4 py-2 text-gray-1"
                    onClick={reportIssue}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Report issue"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default ReportIssue;
