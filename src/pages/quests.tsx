import type { NextPage } from "next";
import AppBar from "~/components/AppBar";
import Container from "~/components/Container";
import Loading from "~/components/Loading";
import Error from "~/components/Error";
import Quest from "~/components/Quest";
import { api } from "~/utils/api";
import { DUMMY_DRIVER_ID } from "~/utils/constants";
import { QuestFreq } from "@prisma/client";

const Quests: NextPage = () => {
  const { data: quests, isLoading } =
    api.quests.getAllQuestsByDriverId.useQuery({ driverId: DUMMY_DRIVER_ID });

  const { data: minimumGoal, isLoading: isLoadingMinimumGoal } =
    api.drivers.getMinimumGoalByDriverId.useQuery({
      driverId: DUMMY_DRIVER_ID,
    });

  const dailyQuests = quests?.filter(
    (quest) => quest.frequency === QuestFreq.DAILY
  );
  const repeatableQuests = quests?.filter(
    (quest) => quest.frequency === QuestFreq.REPEATABLE
  );

  const dailyQuestsExist = dailyQuests && dailyQuests.length > 0;
  const repeatableQuestsExist = repeatableQuests && repeatableQuests.length > 0;

  if (isLoading || isLoadingMinimumGoal) {
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
        {dailyQuestsExist ? (
          <>
            <div className="mt-4 text-lg">DAILY</div>
            <div className="flex flex-col gap-3">
              {dailyQuests.map((quest) => (
                <Quest
                  key={quest.questInstanceId}
                  quest={quest}
                  minimumGoal={minimumGoal ?? 0}
                ></Quest>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
        {repeatableQuestsExist ? (
          <>
            <div className={`mt-${dailyQuestsExist ? 8 : 4} text-lg`}>
              DAILY
            </div>
            <div className="flex flex-col gap-3">
              {repeatableQuests.map((quest) => (
                <Quest
                  key={quest.questInstanceId}
                  quest={quest}
                  minimumGoal={minimumGoal ?? 0}
                ></Quest>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
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
