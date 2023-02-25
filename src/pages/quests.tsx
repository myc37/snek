import type { NextPage } from "next";
import AppBar from "~/components/AppBar";
import Container from "~/components/Container";
import Loading from "~/components/Loading";
import Error from "~/components/Error";
import Quest from "~/components/Quest";
import type { FeQuest } from "~/types/quests";
import { api } from "~/utils/api";
import { DUMMY_DRIVER_ID } from "~/utils/constants";

const Quests: NextPage = () => {
  const { data: quests, isLoading } =
    api.quests.getAllQuestsByDriverId.useQuery({ driverId: DUMMY_DRIVER_ID });

  const quest: FeQuest = {
    title: "Attendance",
    targetPercentage: null,
    targetValue: 10,
    bonusAmount: 0.5,
    currentValue: 1,
    frequency: "DAILY",
    isCompleted: false,
    questInstanceId: "23",
  };

  if (isLoading) {
    return <Loading />;
  } else if (quests === undefined) {
    return <Error />;
  }

  return (
    <>
      <AppBar />
      <Container className="min-h-screen pt-4 pb-20">
        <div className="text-2xl font-bold">Quests</div>
        <div className="mt-1 mb-2 text-sm">Do these to earn bonuses!</div>
        <Quest quest={quest}></Quest>
      </Container>
    </>
  );
};
export default Quests;
