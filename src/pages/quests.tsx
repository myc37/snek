import type { NextPage } from "next";
import AppBar from "~/components/AppBar";
import Container from "~/components/Container";
import Quest from "~/components/Quest";
import type { FeQuest } from "~/types/quests";

const Quests: NextPage = () => {
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
