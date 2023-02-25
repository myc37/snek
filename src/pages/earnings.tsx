/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextPage } from "next";
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

const History: NextPage = () => {
  const currentMonth = months[new Date().getMonth()] as Month;
  const potentialEarnings = 3700;

  const barProgress = Math.round(Math.random() * 100 + 1);

  const { data: countryConfig, isLoading: isLoadingConfig } =
    api.config.getConfigByCountry.useQuery({ country: "SG" });
  const basePay = countryConfig?.vehicleConfig.VAN.baseSalary ?? 2500;

  const { data: quantityBonus, isLoading: isLoadingQuantityBonus } =
    api.driver.getQtyBonusByDriverId.useQuery({
      driverId: DUMMY_DRIVER_ID,
    });

  const { data: bonusData, isLoading: isLoadingTypeBonus } =
    api.driver.getTypeBonusByDriverId.useQuery({
      driverId: DUMMY_DRIVER_ID,
    });
  const { bonusesTotal, bonusesArray } = bonusData ?? {
    bonusesTotal: 0,
    bonusesArray: [],
  };

  const questBonus = 200;
  const questRecords: string[] = [];

  const { data: infractionData, isLoading: isLoadingInfractions } =
    api.driver.getInfractionsByDriverId.useQuery({
      driverId: DUMMY_DRIVER_ID,
    });
  const { infractionTotal, infractionsArray } = infractionData ?? {
    infractionTotal: 0,
    infractionsArray: [],
  };

  const isLoading =
    isLoadingConfig ||
    isLoadingQuantityBonus ||
    isLoadingTypeBonus ||
    isLoadingInfractions;

  if (isLoading) {
    return <Loading />;
  } else if (
    quantityBonus === undefined ||
    bonusesTotal === undefined ||
    bonusesArray === undefined ||
    infractionTotal === undefined ||
    infractionsArray === undefined
  ) {
    return <Error />;
  }

  return (
    <>
      <AppBar />
      <Container className="bg-white pt-4">
        <div className="text-2xl font-bold">{`${currentMonth}'s earnings`}</div>
        <div className="my-8">
          <div>You are on track to earning</div>
          <div className="my-2 text-4xl">{`${addCurrency(
            formatNumbersWithCommas(potentialEarnings),
            "SG"
          )}`}</div>
          <div>{`for ${currentMonth}`}</div>
        </div>
      </Container>
      <Container className="">
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
            completedOrders={130}
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
        questBonus={questBonus}
        questRecords={questRecords}
      />

      <Infractions
        currentMonth={currentMonth}
        infractionAmount={infractionTotal}
        infractionRecords={infractionsArray}
      />
    </>
  );
};
export default History;
