import { Disclosure, Transition } from "@headlessui/react";
import { type FC } from "react";
import { BiChevronDown } from "react-icons/bi";
import { type Month } from "~/types/dates";
import { addCurrency, formatNumbersWithCommas } from "~/utils/numbers";
import Container from "./Container";

type Props = {
  currentMonth: Month;
  typeBonus: number;
  bonusRecords: Array<Array<string | number>>;
};

const TypeBonus: FC<Props> = ({ currentMonth, typeBonus, bonusRecords }) => {
  return (
    <Container className="bg-white">
      <Disclosure>
        {({ open }) => (
          <div className="my-8">
            <Disclosure.Button className="relative flex w-full flex-col">
              <div className="mb-4 text-xl">{`${currentMonth}'s type bonus`}</div>
              <div className="text-3xl">{`${addCurrency(
                formatNumbersWithCommas(typeBonus),
                "SG"
              )}`}</div>
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
                <div className="mt-4 flex flex-col gap-2">
                  {bonusRecords.map((record, idx) => (
                    <div key={idx}>{`${record[0] ?? ""}x ${
                      record[1] ?? ""
                    } * ${addCurrency(
                      formatNumbersWithCommas((record[2] as number) ?? 0),
                      "SG"
                    )} = ${addCurrency(
                      formatNumbersWithCommas((record[3] as number) ?? 0),
                      "SG"
                    )}`}</div>
                  ))}
                </div>
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
    </Container>
  );
};
export default TypeBonus;
