/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Dialog, Transition } from "@headlessui/react";
import { type ChangeEvent, Fragment, useState, type FC } from "react";
import { type Filter } from "~/types/filter";
import { initFilterForRender } from "~/utils/filter";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  filter: Filter;
  applyFilters: (newFilter: Filter) => void;
};

const FilterModal: FC<Props> = ({
  isOpen,
  handleClose,
  filter,
  applyFilters,
}) => {
  const [newFilter, setNewFilter] = useState(filter);

  const generateUpdateFilter = (key: keyof Filter, entry: string) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setNewFilter({
        ...newFilter,
        [key]: { ...newFilter[key], [entry]: event.target.checked },
      });
    };
  };

  const closeAndReset = () => {
    handleClose();
    setNewFilter(filter);
  };

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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Filter parcels
                </Dialog.Title>
                <div className="mt-2 flex flex-col gap-4">
                  {Object.entries(initFilterForRender()).map(([key, value]) => (
                    <div key={key}>
                      <div className="font-bold">{key}</div>
                      <div className="flex flex-col">
                        {value.map((entry) => (
                          <div className="flex items-center gap-2" key={entry}>
                            <input
                              type="checkbox"
                              checked={Boolean(
                                (newFilter[key as keyof Filter] as any)[
                                  entry as any
                                ]
                              )}
                              onChange={generateUpdateFilter(
                                key as keyof Filter,
                                entry
                              )}
                            />
                            <label>{entry}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    className="w-full rounded-md border-2 border-primary px-3 py-1 text-primary"
                    onClick={closeAndReset}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-full rounded-md border-2 border-primary bg-primary px-3 py-1 text-gray-1"
                    onClick={() => applyFilters(newFilter)}
                  >
                    Apply
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
export default FilterModal;
