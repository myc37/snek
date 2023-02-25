/**
 * Enums
 */
export const VEHICLE_TYPE = {
  VAN: "Van",
  MOTORCYCLE: "Motorcycle",
  CAR_SEDAN: "Car (Sedan)",
  CAR_SUV: "Car (SUV)",
  LORRY: "Lorry",
} as const;
export type VehicleType = keyof typeof VEHICLE_TYPE;
