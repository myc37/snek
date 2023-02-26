/* eslint-disable @next/next/no-img-element */
import type { Quest, QuestProgression } from "@prisma/client";
import type { FC } from "react";

type Props = {
  data: {
    rewardTrack: Quest;
    progression: QuestProgression;
  };
};

const RewardTrack: FC<Props> = ({ data }) => {
  const bronzeDistance = (
    (data.rewardTrack.bronzeThreshold / data.rewardTrack.goldThreshold) *
    100
  ).toPrecision(2);
  const silverDistance = (
    (data.rewardTrack.silverThreshold / data.rewardTrack.goldThreshold) *
    100
  ).toPrecision(2);
  const progressionDistance = (
    (data.progression.currentProgression / data.rewardTrack.goldThreshold) *
    100
  ).toPrecision(2);

  const isGold =
    data.progression.currentProgression === data.rewardTrack.goldThreshold;
  const isSilver =
    !isGold &&
    data.progression.currentProgression >= data.rewardTrack.silverThreshold;
  const isBronze =
    !isSilver &&
    data.progression.currentProgression >= data.rewardTrack.bronzeThreshold;
  const isNoProgress = data.progression.currentProgression === 0;

  return (
    <div className="mb-4 flex flex-col rounded-md border-2 border-white bg-white p-4 shadow-md">
      <div className="mb-4 flex">
        <div className="relative mr-4 h-16 w-16">
          <div
            className={`absolute z-10 h-16 w-16 rounded-full bg-opacity-50 ${
              isGold
                ? "bg-yellow-600"
                : isSilver
                ? "bg-zinc-600"
                : isBronze
                ? "bg-yellow-900"
                : "bg-opacity-0"
            }`}
          />
          <img
            src="ninja-badge.png"
            alt="inja badge"
            className={`absolute top-0 w-16 sepia ${
              isNoProgress ? "brightness-[15%]" : ""
            }`}
          />
          {isNoProgress ? (
            <div className="absolute top-[25%] left-0 z-30 w-16 text-center  text-2xl text-white">
              ?
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex h-12 flex-col justify-evenly">
          <div className="font-space-mission">{data.rewardTrack.title}</div>
          <div className="text-xs font-light">
            {isGold ? "Gold" : isSilver ? "Silver" : isBronze ? "Bronze" : "No"}{" "}
            badge achieved
          </div>
        </div>
      </div>
      <div className="mb-8 text-sm">{data.rewardTrack.description}</div>
      <div className="relative h-8 w-full rounded-xl border-2 border-black">
        <div
          className={`absolute top-0 left-0 bottom-0 m-[2px] max-w-[99%] rounded-tl-lg rounded-bl-lg bg-red-600 ${
            isGold ? "rounded-tr-lg rounded-br-lg" : ""
          }`}
          style={{ width: `${progressionDistance}%` }}
        />
        <div
          className={`absolute -top-[33%] h-12 w-[2px] bg-yellow-900`}
          style={{ left: `${bronzeDistance}%` }}
        />
        <div
          className={`absolute top-[130%] text-sm font-bold text-green-600`}
          style={{ left: `${parseInt(bronzeDistance) - 7}%` }}
        >
          +${data.rewardTrack.bronzeReward}
        </div>
        <div
          className={`absolute -top-[33%] h-12 w-[2px] bg-zinc-600`}
          style={{ left: `${silverDistance}%` }}
        />
        <div
          className={`absolute top-[130%] text-sm font-bold text-green-600`}
          style={{ left: `${parseInt(silverDistance) - 7}%` }}
        >
          +${data.rewardTrack.silverReward}
        </div>
        <div
          className={`absolute top-[130%] text-sm font-bold text-green-600`}
          style={{ left: `90%` }}
        >
          +${data.rewardTrack.goldReward}
        </div>
        <img
          src="ninja-van.png"
          alt="van van"
          className={`absolute -top-[40%] w-16 ${isGold ? "hidden" : ""}`}
          style={{ left: `${progressionDistance}%` }}
        />
      </div>
      <div className="mt-8 text-center text-sm font-light">
        {(isSilver
          ? data.rewardTrack.goldThreshold
          : isBronze
          ? data.rewardTrack.silverThreshold
          : data.rewardTrack.bronzeThreshold) -
          data.progression.currentProgression}{" "}
        more deliveries to next badge!
      </div>
    </div>
  );
};

export default RewardTrack;
