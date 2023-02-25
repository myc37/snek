import { Listbox, Transition } from "@headlessui/react";
import { Country } from "@prisma/client";
import type { NextPage } from "next";
import { Fragment, useState } from "react";
import { BiCheck, BiChevronDown } from "react-icons/bi";
import FullScreenContainer from "~/components/FullScreenContainer";
import Navbar from "~/components/Navbar";

const Admin: NextPage = () => {
  const placeholder = "Please select a country";
  const [country, setCountry] = useState<Country | typeof placeholder>(
    placeholder
  );

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
        <label>Select Country:</label>
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
                {Object.keys(Country).map((country, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
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
      </FullScreenContainer>
    </>
  );
};
export default Admin;
