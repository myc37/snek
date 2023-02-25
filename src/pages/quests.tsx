import type { NextPage } from "next";
import AppBar from "~/components/AppBar";
import Container from "~/components/Container";
import Error from "~/components/Error";
import Loading from "~/components/Loading";
import RewardTrack from "~/components/RewardTrack";
import { api } from "~/utils/api";
import { DUMMY_DRIVER_ID } from "~/utils/constants";

const Quests: NextPage = () => {
  const { data, isLoading, isFetching, isError } =
    api.quests.getRewardTracksByDriverId.useQuery({
      driverId: DUMMY_DRIVER_ID,
    });

  if (isLoading || isFetching) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      <AppBar />
      <Container className="min-h-screen bg-red-50 pt-4 pb-20">
        {data?.map((doc) => (
          <RewardTrack key={doc.rewardTrack.id} data={doc} />
        ))}
      </Container>
    </>
  );
};
export default Quests;
