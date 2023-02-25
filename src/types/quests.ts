import { type Driver } from "./drivers";

export type Quest = {
  type: QuestType;
  freq: QuestFreq;
  targetPercentage: number;
  title: string;
  value: number;
};

export type QuestInstance = {
  date: Date;
  driver: Driver;
  quest: Quest;
  completionPercentage: number;
  isComplete: boolean;
};

/**
 * Enums
 */
export const QUEST_TYPE = {
  ATTENDANCE: "Attendance",
  SUCCESSFUL: "Successful",
} as const;
export type QuestType = keyof typeof QUEST_TYPE;

export const QUEST_FREQ = {
  DAILY: "Daily",
  REPEATABLE: "Repeatable",
} as const;
export type QuestFreq = keyof typeof QUEST_FREQ;
