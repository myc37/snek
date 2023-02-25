import type { FC } from "react";
import type { FeQuest } from "~/types/quests";
import { Disclosure } from "@headlessui/react";
import { api } from "~/utils/api";

type Props = {
  quest: FeQuest;
};

const Quest: FC<Props> = ({ quest }) => {
  const {
    data: minimumGoal,
    isLoading,
    isFetching,
  } = api.drivers.getMinimumGoalByDriverId.useQuery({
    driverId: "1",
  });

  if (isFetching || isLoading) return <>Loading...</>;

  return (
    <Disclosure>
      {({ open }) => (
        <div
          className={`rounded-md border-2 bg-white px-4 transition-all ${
            open
              ? " border-primary py-4 shadow-xl"
              : "border-white py-2 shadow-md"
          }`}
        >
          <Disclosure.Button className="relative flex w-full flex-col">
            <div className="flex w-full flex-col items-start">
              <div className="text-xs">
                {new Date().toLocaleDateString("en-sg", {
                  month: "short",
                  day: "2-digit",
                })}
              </div>

              <div className="mt-1 font-bold">{quest.title}</div>

              <div className="mt-4 flex w-full flex-row items-end justify-between">
                <div className="font-bold">{`+${quest.bonusAmount}`}</div>
                <div className="text-lg">
                  {quest.frequency === "DAILY" ? (
                    <div>
                      {Math.round(quest.currentValue ?? 0 / (minimumGoal ?? 0))}
                      %
                    </div>
                  ) : (
                    <div>
                      {quest.currentValue} / {quest.targetValue}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Disclosure.Button>
        </div>
      )}
    </Disclosure>
  );
};

export default Quest;
