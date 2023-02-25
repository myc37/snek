import type { FC } from "react";
import type { FeQuest } from "~/types/quests";
import { Disclosure } from "@headlessui/react";

type Props = {
  quest: FeQuest;
  minimumGoal: number;
};

const Quest: FC<Props> = ({ quest, minimumGoal }) => {
  const getProgressionColor = () => {
    const progression = Math.round(
      quest.frequency === "DAILY"
        ? quest.currentValue ?? 0 / minimumGoal
        : (quest?.currentValue ?? 0) / (quest?.targetValue ?? 0)
    );

    if (progression < 0.25) {
      return "text-red-500";
    } else if (progression < 0.5) {
      return "text-yellow-500";
    } else {
      return "text-green-500";
    }
  };

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
                  month: "long",
                  day: "2-digit",
                })}
              </div>

              <div className="mt-1 font-bold">{quest.title}</div>

              <div className="mt-4 flex w-full flex-row items-end justify-between">
                <div className="font-bold text-green-500">{`+$${quest.bonusAmount.toFixed(
                  2
                )}`}</div>
                <div
                  className={`text-lg font-semibold ${getProgressionColor()}`}
                >
                  {quest.frequency === "DAILY" ? (
                    <div>
                      {Math.round(quest.currentValue ?? 0 / minimumGoal) * 100}%
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
