/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Disclosure } from "@headlessui/react";
import { PackageBonusType } from "@prisma/client";
import type { NextPage } from "next";
import { Fade } from "react-awesome-reveal";
import CountUp from "react-countup";
import { BiChevronsUp } from "react-icons/bi";
import AppBar from "~/components/AppBar";
import Container from "~/components/Container";
import Error from "~/components/Error";
import Infractions from "~/components/Infractions";
import Loading from "~/components/Loading";
import ProgressBar from "~/components/ProgressBar";
import QuestBonus from "~/components/QuestBonus";
import TypeBonus from "~/components/TypeBonus";
import { type Month, months } from "~/types/dates";
import { api } from "~/utils/api";
import { DUMMY_DRIVER_ID } from "~/utils/constants";
import { addCurrency, formatNumbersWithCommas } from "~/utils/numbers";
import { mapBonusType, mapInfractionType } from "~/utils/strings";

const History: NextPage = () => {
  const currentMonth = months[new Date().getMonth()] as Month;

  const { data: parcelsCompleted, isLoading: isLoadingCompleted } =
    api.parcels.getCompletedByDriverId.useQuery({
      driverId: DUMMY_DRIVER_ID,
    });

  const { data: countryConfig, isLoading: isLoadingConfig } =
    api.config.getConfigByCountry.useQuery({ country: "SG" });
  let basePay = (countryConfig?.vehicleConfig.VAN ?? {}).baseSalary ?? 2500;
  basePay = 2500;

  const parcelMinGoal =
    ((
      Object.entries(
        countryConfig?.vehicleConfig.VAN.incentivePayStructure ??
          ({} as Record<number, number>)
      ) as number[][]
    ).find(([_, val]) => val === 0) ?? [])[0] ?? 200;

  const barProgress =
    ((parcelsCompleted ? parcelsCompleted.length : 130) / parcelMinGoal) * 100;

  const { data: quantityBonus, isLoading: isLoadingQuantityBonus } =
    api.drivers.getQtyBonusByDriverId.useQuery({
      driverId: DUMMY_DRIVER_ID,
    });

  const { data: bonusData, isLoading: isLoadingTypeBonus } =
    api.drivers.getTypeBonusByDriverId.useQuery({
      driverId: DUMMY_DRIVER_ID,
    });
  const { bonusesTotal, bonusesArray } = bonusData ?? {
    bonusesTotal: 0,
    bonusesArray: [],
  };

  const { data: infractionData, isLoading: isLoadingInfractions } =
    api.drivers.getInfractionsByDriverId.useQuery({
      driverId: DUMMY_DRIVER_ID,
    });
  const { infractionTotal, infractionsArray } = infractionData ?? {
    infractionTotal: 0,
    infractionsArray: [],
  };

  const isLoading =
    isLoadingCompleted ||
    isLoadingConfig ||
    isLoadingQuantityBonus ||
    isLoadingTypeBonus ||
    isLoadingInfractions;

  if (isLoading) {
    return <Loading />;
  } else if (
    parcelsCompleted === undefined ||
    quantityBonus === undefined ||
    bonusesTotal === undefined ||
    bonusesArray === undefined ||
    infractionTotal === undefined ||
    infractionsArray === undefined
  ) {
    return <Error />;
  }

  // const potentialEarnings =
  //   basePay + quantityBonus + bonusesTotal + questTotal - infractionTotal;
  const potentialEarnings = 2632.2;

  return (
    <>
      <AppBar />
      <Container className="flex h-screen flex-col items-center justify-center bg-opacity-70 bg-gradient-radial">
        <div className=" relative -top-28">
          <div className="absolute -top-[450%] left-0 right-0 mx-auto flex animate-float flex-col items-center justify-center">
            <div className="w-36">
              <Fade delay={400} triggerOnce>
                <img
                  src="/ninja-money.png"
                  alt="money boy"
                  className="w-full"
                />
              </Fade>
            </div>
            <div
              className="relative bottom-[98px] z-30 bg-gradient-to-r from-white to-yellow-500 bg-clip-text text-center
          font-space-mission text-6xl tracking-[0.15em] text-gray-1 text-transparent"
            >
              $
              <CountUp end={potentialEarnings} duration={3} useEasing />
            </div>
          </div>
          <div className="relative animate-float-slow">
            <Fade triggerOnce>
              <div className="relative h-12 w-full overflow-hidden rounded-2xl border-4 border-primary-900 bg-slate-900">
                <img
                  src="/bronze-to-silver.png"
                  className="absolute w-[60%] transition-all"
                />
              </div>
            </Fade>
            <div className="absolute left-0 right-0 -bottom-full mx-auto text-center text-white">
              134 delivered
              <div className="text-xs text-gray-300">
                (Only 66 more to rank up to Novice Ninja)
              </div>
            </div>
            <div className="absolute -top-[200%] left-0 w-16">
              <Fade direction="left" delay={100} triggerOnce>
                <img src="/apprentice-ninja.png" alt="novice" />
              </Fade>
            </div>
            <div className="absolute -top-[200%] right-0 w-16">
              <Fade direction="right" delay={200} triggerOnce>
                <img src="/novice-ninja.png" alt="novice" />
              </Fade>
            </div>
          </div>
          <div className="absolute left-0 right-0 -bottom-full top-40  mx-auto text-center text-2xl text-white">
            <div>Current Rank</div>
            <Fade delay={800} big triggerOnce>
              <div
                className="mt-4 bg-gradient-to-r
                 from-white to-apprentice bg-clip-text text-center font-space-mission
                             text-4xl tracking-[0.15em] text-gray-1 text-transparent
                "
              >
                Apprentice
                <br />
                Ninja
              </div>
            </Fade>
            <div className="mt-2 text-sm">
              <span className="bg-gradient-to-r from-white  to-yellow-400 bg-clip-text font-space-mission tracking-[0.15em] text-transparent">
                +$0.50
              </span>{" "}
              per parcel delivered
            </div>
          </div>
          <div className=" absolute top-[22rem] left-0 right-0 -bottom-full mx-auto text-center text-sm text-white">
            <div>Next Rank</div>
            <Fade delay={1200} big triggerOnce>
              <div
                className="mt-2 bg-gradient-to-r
                   from-white to-novice bg-clip-text text-center font-space-mission
                               text-lg tracking-[0.15em] text-gray-1 text-transparent
                  "
              >
                Novice Ninja
              </div>
            </Fade>
          </div>
          <div className="text-yellow absolute top-[450px] left-0 right-0 mx-auto flex animate-bounce flex-col items-center text-yellow-400">
            Scroll down
            <BiChevronsUp className="rotate-180 text-3xl text-yellow-400" />
          </div>
        </div>
      </Container>
      <Container className="min-h-screen bg-background pb-20 pt-8">
        <div className="mb-4 text-2xl font-bold">{`${currentMonth}'s earnings`}</div>
        <div className="mb-4 rounded-md bg-white p-4 shadow-md">
          <div>You are on track to earning</div>
          <div className="my-2 text-4xl">{`${addCurrency(
            formatNumbersWithCommas(potentialEarnings),
            "SG"
          )}`}</div>
          <div>{`for ${currentMonth}`}</div>
        </div>
        <div className="rounded-md bg-white p-4">
          <div className="text-xl font-bold">Breakdown</div>
          <hr className="my-4" />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="font-bold text-gray-600 opacity-90">Base pay</div>
              <div>{addCurrency(formatNumbersWithCommas(basePay), "SG")}</div>
            </div>
            <Disclosure>
              <Disclosure.Button>
                <div className="flex justify-between">
                  <div className="font-bold text-gray-600 opacity-90">
                    Rank bonus
                  </div>
                  <div className="underline">
                    {addCurrency(formatNumbersWithCommas(67), "SG")}
                  </div>
                </div>
              </Disclosure.Button>
              <Disclosure.Panel>
                <div className="mb-2 flex flex-col gap-2 text-sm text-gray-600 opacity-70">
                  <div className="flex justify-between">
                    <div>100 parcels x $0.20 (Novice)</div>
                    <div>$50</div>
                  </div>
                  <div className="flex justify-between">
                    <div>134 parcels x $0.50 (Apprentice)</div>
                    <div>$67</div>
                  </div>
                </div>
              </Disclosure.Panel>
            </Disclosure>
            <Disclosure>
              <Disclosure.Button>
                <div className="flex justify-between">
                  <div className="font-bold text-gray-600 opacity-90">
                    Type bonus
                  </div>
                  <div className="underline">
                    {addCurrency(formatNumbersWithCommas(bonusesTotal), "SG")}
                  </div>
                </div>
              </Disclosure.Button>
              <Disclosure.Panel>
                <div className="mb-2 flex flex-col gap-2 text-sm text-gray-600 opacity-70">
                  {bonusesArray.map((record, idx) => (
                    <div key={idx} className="flex justify-between">
                      <div>{`${record[0] ?? ""} ${
                        mapBonusType(record[1]) ?? ""
                      } x ${addCurrency(
                        formatNumbersWithCommas(record[2] ?? 0),
                        "SG"
                      )}`}</div>
                      <div>{`${addCurrency(
                        formatNumbersWithCommas(record[3] ?? 0),
                        "SG"
                      )}`}</div>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </Disclosure>{" "}
            <Disclosure>
              <Disclosure.Button>
                <div className="flex justify-between">
                  <div className="font-bold text-gray-600 opacity-90">
                    Quest bonus
                  </div>
                  <div className="underline">
                    {addCurrency(formatNumbersWithCommas(49), "SG")}
                  </div>
                </div>
              </Disclosure.Button>
              <Disclosure.Panel>
                <div className="mb-2 flex flex-col gap-2 text-sm text-gray-600 opacity-70">
                  <div className="flex justify-between">
                    <div>Daily: 18 attendance x $0.50</div>
                    <div>$9</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Daily: 10 90% successful x $3.00</div>
                    <div>$30</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Repeatable: 2 25 successful x $5.00</div>
                    <div>$10</div>
                  </div>
                </div>
              </Disclosure.Panel>
            </Disclosure>
            <Disclosure>
              <Disclosure.Button>
                <div className="flex justify-between">
                  <div className="font-bold text-red-600 opacity-90">
                    Penalties
                  </div>
                  <div className="underline">
                    -
                    {addCurrency(
                      formatNumbersWithCommas(infractionTotal),
                      "SG"
                    )}
                  </div>
                </div>
              </Disclosure.Button>
              <Disclosure.Panel>
                <div className="mb-2 flex flex-col gap-2 text-sm text-gray-600 opacity-70">
                  {infractionsArray.map((infraction, idx) => (
                    <div key={idx} className="flex justify-between">
                      <div>
                        {`${infraction[0] ?? ""} ${mapInfractionType(
                          infraction[1]
                        )} x -${addCurrency(
                          formatNumbersWithCommas(infraction[2] ?? 0),
                          "SG"
                        )}`}
                      </div>
                      <div>{`-${addCurrency(
                        formatNumbersWithCommas(infraction[3] ?? 0),
                        "SG"
                      )}`}</div>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </Disclosure>
          </div>
        </div>
      </Container>
      {/* <Container className="">
        <div className="my-8">
          <div className="mb-4 text-xl">{`${currentMonth}'s quantity bonus`}</div>
          <div className="mb-2 flex gap-2 text-3xl">
            <div className="flex flex-col">
              <div>{`${addCurrency(
                formatNumbersWithCommas(basePay),
                "SG"
              )}`}</div>
              <div className="text-sm text-gray-600">base pay</div>
            </div>
            <div>+</div>
            <div className="flex flex-col">
              <div>{`${addCurrency(
                formatNumbersWithCommas(quantityBonus),
                "SG"
              )}`}</div>
              <div className="text-sm text-gray-600">quantity bonus</div>
            </div>
          </div>
          <div>
            you can gain more quantity bonus by exceeding your monthly goal
          </div>
          <ProgressBar
            className="mt-10"
            barProgress={barProgress}
            completedOrders={parcelsCompleted.length}
          />
        </div>
      </Container>
      <TypeBonus
        currentMonth={currentMonth}
        typeBonus={bonusesTotal}
        bonusRecords={bonusesArray}
      />

      <QuestBonus
        currentMonth={currentMonth}
        questBonus={questTotal}
        questRecords={questArray}
      />

      <Infractions
        currentMonth={currentMonth}
        infractionAmount={infractionTotal}
        infractionRecords={infractionsArray}
      /> */}
    </>
  );
};
export default History;
