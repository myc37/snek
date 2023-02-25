import { type Infraction } from "./infractions";
import { type Parcel } from "./parcels";
import { type QuestInstance } from "./quests";
import { type VehicleType } from "./vehicles";

export type Driver = {
  name: string;
  licenseNumber: string;
  vehicleType: VehicleType;
  homeStation: string;
  parcels: Parcel[];
  questInstances: QuestInstance[];
  infraction: Infraction[];
};
