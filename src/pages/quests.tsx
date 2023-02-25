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
        <div className="flex flex-col gap-3">
          {quests.map((quest) => (
            <Quest key={quest.questInstanceId} quest={quest}></Quest>
          ))}
        </div>
        {quests.length === 0 ? (
          <div className="my-10 flex flex-col items-center justify-center">
            <img
              src="/ninja-thumbs.png"
              alt="ninja thumbs up"
              className="max-w-xs pr-12"
            />
            <div className="mt-4 text-center text-lg text-primary">
              No quests left. Stay tuned for more!
            </div>
          </div>
        ) : null}
      </Container>
    </>
  );
};
export default Quests;
