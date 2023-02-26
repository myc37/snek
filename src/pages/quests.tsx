import type { NextPage } from "next";
import { Fade, Flip, Slide } from "react-awesome-reveal";
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
        <div className="text-2xl font-bold">Quests</div>
        <div className="mt-1 mb-4 text-sm font-light">
          Complete these to earn rewards!
        </div>
        <Flip direction="horizontal" cascade>
          {data?.map((doc) => (
            <RewardTrack key={doc.rewardTrack.id} data={doc} />
          ))}
        </Flip>
      </Container>
    </>
  );
};
export default Quests;
