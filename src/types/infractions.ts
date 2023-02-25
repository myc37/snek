import { type Driver } from "./drivers";

export type Infraction = {
  type: InfractionType;
  driver: Driver;
  date: Date;
};

/**
 * Enums
 */
export const INFRACTION_TYPE = {
  FAKE_FAILURE: "Fake failure",
  NO_PROOF_OF_RECEIPT: "No proof of receipt",
} as const;
export type InfractionType = keyof typeof INFRACTION_TYPE;
