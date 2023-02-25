/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

const RewardTrack = () => {
  const [progression, setProgression] = useState(4);
  const max = 8;
  const bronzeMilestone = 2;
  const bronzeDistance = ((bronzeMilestone / max) * 100).toPrecision(2);
  const silverMilestone = 5;
  const silverDistance = ((silverMilestone / max) * 100).toPrecision(2);
  const progressionDistance = ((progression / max) * 100).toPrecision(2);

  return (
    <div className="flex flex-col rounded-md border-2 border-white bg-white p-4 shadow-md">
      <div className="mb-4 flex">
        <div className="relative mr-4 h-16 w-16">
          <div
            className={`absolute z-10 h-16 w-16 rounded-full bg-opacity-50 ${
              progression === max
                ? "bg-yellow-600"
                : progression >= silverMilestone
                ? "bg-zinc-600"
                : progression >= bronzeMilestone
                ? "bg-yellow-900"
                : "bg-opacity-0"
            }`}
          />
          <img
            src="ninja-badge.png"
            alt="inja badge"
            className={`absolute top-0 w-16 sepia ${
              progression === 0 ? "brightness-[15%]" : ""
            }`}
          />
          {progression === 0 ? (
            <div className="absolute top-[25%] left-0 z-30 w-16 text-center  text-2xl text-white">
              ?
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex h-12 flex-col justify-evenly">
          <div className="font-space-mission">Enthu Ninja</div>
          <div className="text-xs font-light">
            {progression === max
              ? "gold"
              : progression >= silverMilestone
              ? "silver"
              : progression >= bronzeMilestone
              ? "bronze"
              : "no"}{" "}
            badge achieved
          </div>
        </div>
      </div>
      <div className="mb-8 text-sm">
        Deliver parcels on weekends and pulic holidays to earn progress for this
        reward track
      </div>
      <div className="relative h-8 w-full rounded-xl border-2 border-black">
        <div
          className={`absolute top-0 left-0 bottom-0 m-[2px] max-w-[99%] rounded-tl-lg rounded-bl-lg bg-red-600 ${
            progression === max ? "rounded-tr-lg rounded-br-lg" : ""
          }`}
          style={{ width: `${progressionDistance}%` }}
        />
        <div
          className={`absolute -top-[33%] h-12 w-[2px] bg-yellow-900`}
          style={{ left: `${bronzeDistance}%` }}
        />
        <div
          className={`absolute -top-[33%] h-12 w-[2px] bg-zinc-600`}
          style={{ left: `${silverDistance}%` }}
        />
        <img
          src="ninja-van.png"
          alt="van van"
          className={`absolute -top-[40%] w-16 ${
            progression === max ? "hidden" : ""
          }`}
          style={{ left: `${progressionDistance}%` }}
        />
      </div>
      <div className="mt-4 text-center text-sm font-light">
        {max - progression} more deliveries to next badge!
      </div>
    </div>
  );
};

export default RewardTrack;
