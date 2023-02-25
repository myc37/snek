import { Listbox, Transition } from "@headlessui/react";
import {
  Country,
  FailureReason,
  InfractionType,
  VehicleType,
} from "@prisma/client";
import type { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import { BiCheck, BiChevronDown } from "react-icons/bi";
import Error from "~/components/Error";
import FullScreenContainer from "~/components/FullScreenContainer";
import Loading from "~/components/Loading";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";
import { isValidNumber } from "~/utils/numbers";

const Admin: NextPage = () => {
  const placeholder = "Please select a country";
  const [country, setCountry] = useState<Country | typeof placeholder>(
    placeholder
  );
  const vehiclePlaceholder = "Please select a vehicle type";
  const [vehicle, setVehicle] = useState<
    VehicleType | typeof vehiclePlaceholder
  >(vehiclePlaceholder);
  const { data: countryConfig, isLoading } =
    api.config.getConfigByCountry.useQuery(
      { country: country as Country },
      { enabled: country !== placeholder }
    );
  const [tempConfig, setTempConfig] = useState(countryConfig);

  useEffect(() => {
    setTempConfig(countryConfig);
  }, [countryConfig]);

  return (
    <>
      <Navbar />
      <FullScreenContainer className="bg-background">
        <div className="text-2xl font-bold">
          Last mile driver configurations
        </div>
        <div className="mt-1 mb-4 text-sm text-gray-600">
          Here you are able to change the last mile driver base salary, pay
          structure by vehicle, incentives, quests, infraction deducation, and
          more.
        </div>
        <label>Select country:</label>
        <Listbox value={country} onChange={(e) => setCountry(e)}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{country}</span>
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
                  value={placeholder}
                >
                  {placeholder}
                </Listbox.Option>
                {Object.keys(Country).map((country) => (
                  <Listbox.Option
                    key={country}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-primary-100 text-primary-900"
                          : "text-gray-900"
                      }`
                    }
                    value={country}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {country}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <BiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        {country === placeholder ? null : isLoading ? (
          <Loading />
        ) : tempConfig === undefined ? (
          <Error />
        ) : (
          <>
            <div className="mt-8 mb-4 rounded-md border-[3px] border-primary p-4">
              <div className="mb-4 text-xl">Infraction configurations</div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={Boolean(tempConfig.isInfractionVisible)}
                  onChange={(e) =>
                    setTempConfig({
                      ...tempConfig,
                      isInfractionVisible: e.target.checked,
                    })
                  }
                />
                Will infraction penalties be visible to the drivers?
              </label>
              <hr className="mt-4 border-primary" />
              <div className="mt-4 mb-2 font-bold">Infraction structure:</div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <div>Fake failure deduction</div>
                  <input
                    className="mt-2 rounded-md border-2 border-primary p-2"
                    value={
                      tempConfig.infractionPayStructure[
                        InfractionType.FAKE_FAILURE
                      ]
                    }
                    // onChange={(e) => {
                    //   if (isValidNumber(e.target.value)) {
                    //     setTempConfig({
                    //       ...tempConfig,
                    //       infractionPayStructure: {
                    //         ...tempConfig.infractionPayStructure,
                    //         [InfractionType.FAKE_FAILURE]: Number.parseInt(
                    //           e.target.value,
                    //           10
                    //         ),
                    //       },
                    //     });
                    //   }
                    // }}
                  />
                </div>
                <div className="flex flex-col">
                  <div>No proof of receipt deduction</div>
                  <input
                    className="mt-2 rounded-md border-2 border-primary p-2"
                    value={
                      tempConfig.infractionPayStructure[
                        InfractionType.NO_PROOF_OF_RECEIPT
                      ]
                    }
                    // onChange={(e) => {
                    //   if (isValidNumber(e.target.value)) {
                    //     setTempConfig({
                    //       ...tempConfig,
                    //       infractionPayStructure: {
                    //         ...tempConfig.infractionPayStructure,
                    //         [InfractionType.NO_PROOF_OF_RECEIPT]:
                    //           Number.parseFloat(e.target.value),
                    //       },
                    //     });
                    //   }
                    // }}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="rounded-md border-[3px] border-primary p-4">
                <div className="mb-4 text-xl">Per-vehicle configurations</div>
                <label>Select vehicle:</label>
                <Listbox value={vehicle} onChange={(e) => setVehicle(e)}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{vehicle}</span>
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
                          value={vehiclePlaceholder}
                        >
                          {vehiclePlaceholder}
                        </Listbox.Option>
                        {Object.keys(VehicleType).map((vehicle) => (
                          <Listbox.Option
                            key={vehicle}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-primary-100 text-primary-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={vehicle}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {vehicle}
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
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
                {vehicle !== vehiclePlaceholder ? (
                  <>
                    <hr className="mt-4 border-primary" />
                    <div className="mt-4 flex flex-col gap-4">
                      <div className="flex flex-col">
                        <label>Base salary</label>
                        <input className="mt-2 rounded-md border-2 border-primary p-2" />
                      </div>
                      <div className="flex flex-col">
                        <label>Cash on delivery bonus</label>
                        <input className="mt-2 rounded-md border-2 border-primary p-2" />
                      </div>
                      <div className="flex flex-col">
                        <label>Accessibility bonus</label>
                        <input className="mt-2 rounded-md border-2 border-primary p-2" />
                      </div>
                      <div className="flex flex-col">
                        <label>Priority bonus</label>
                        <input className="mt-2 rounded-md border-2 border-primary p-2" />
                      </div>
                      <div className="flex flex-col">
                        <label>Specific timeslot bonus</label>
                        <input className="mt-2 rounded-md border-2 border-primary p-2" />
                      </div>
                      <hr className="border-primary" />
                      <div className="flex flex-col">
                        <div className="mb-2 font-bold">
                          Package size bonus:
                        </div>
                        <div className="flex flex-col">
                          <label>Extra-small package (XS)</label>
                          <input className="mt-2 rounded-md border-2 border-primary p-2" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label>Small package (S)</label>
                        <input className="mt-2 rounded-md border-2 border-primary p-2" />
                      </div>
                      <div className="flex flex-col">
                        <label>Medium package (M)</label>
                        <input className="mt-2 rounded-md border-2 border-primary p-2" />
                      </div>
                      <div className="flex flex-col">
                        <label>Large package (L)</label>
                        <input className="mt-2 rounded-md border-2 border-primary p-2" />
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="rounded-md border-[3px] border-primary p-4">
                <div className="mb-4 text-xl">Driver quest configurations</div>
              </div>
            </div>
          </>
        )}
      </FullScreenContainer>
    </>
  );
};
export default Admin;
