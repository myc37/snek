import { Disclosure, Transition } from "@headlessui/react";
import { type FC } from "react";
import { BiChevronDown } from "react-icons/bi";
import { type Month } from "~/types/dates";
import { addCurrency, formatNumbersWithCommas } from "~/utils/numbers";
import Container from "./Container";

type Props = {
  currentMonth: Month;
  infractionAmount: number;
  infractionRecords: Array<any>;
};

const Infractions: FC<Props> = ({
  currentMonth,
  infractionAmount,
  infractionRecords,
}) => {
  return (
    <Container className="bg-white pb-20">
      <Disclosure>
        {({ open }) => (
          <div className="my-8">
            <Disclosure.Button className="relative flex w-full flex-col">
              <div className="mb-4 text-xl">{`${currentMonth}'s infractions`}</div>
              <div className="text-3xl">{`${addCurrency(
                formatNumbersWithCommas(infractionAmount),
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
                  {infractionRecords.map((infraction, idx) => (
                    <div key={idx}>infraction</div>
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
export default Infractions;
