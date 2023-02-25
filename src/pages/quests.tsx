import type { NextPage } from "next";
import AppBar from "~/components/AppBar";
import Container from "~/components/Container";
import RewardTrack from "~/components/RewardTrack";

const Quests: NextPage = () => {
  return (
    <>
      <AppBar />
      <Container className="min-h-screen bg-red-50 pt-4 pb-20">
        <RewardTrack />
      </Container>
    </>
  );
};
export default Quests;
