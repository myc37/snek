import type { NextPage } from "next";
import { BiStar } from "react-icons/bi";
import AppBar from "~/components/AppBar";
import Container from "~/components/Container";
import ProgressBar from "~/components/ProgressBar";
import { type Month, months } from "~/types/dates";

const History: NextPage = () => {
  const currentMonth = months[new Date().getMonth()] as Month;
  const potentialEarnings = "3,700";

  const barProgress = Math.round(Math.random() * 100 + 1);

  return (
    <>
      <AppBar />
      <Container>
        <div className="text-2xl font-bold">{`${currentMonth}'s earnings`}</div>
        <div className="my-8">
          <div>You are on track to earning</div>
          <div className="my-2 text-4xl">{`S$${potentialEarnings}`}</div>
          <div>{`for ${currentMonth}`}</div>
        </div>
        <div className="my-8">
          <div className="text-xl">
            {`${currentMonth}'s quantity bonus`}
            <ProgressBar
              className="mt-10"
              barProgress={barProgress}
              completedOrders={130}
            />
          </div>
        </div>
        <div className="my-8">
          <div className="text-xl">{`${currentMonth}'s type bonus`}</div>
        </div>
        <div className="my-8">
          <div className="text-xl">{`${currentMonth}'s quest bonus`}</div>
        </div>
        <div className="my-8">
          <div className="text-xl">{`${currentMonth}'s infractions`}</div>
        </div>
      </Container>
    </>
  );
};
export default History;
