import type { Quest, QuestInstance } from "@prisma/client";

export type FeQuest = Pick<
  QuestInstance,
  "questInstanceId" | "currentValue" | "isCompleted"
> &
  Pick<
    Quest,
    "title" | "bonusAmount" | "targetPercentage" | "targetValue" | "frequency"
  >;
