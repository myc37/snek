import { type Driver } from "~/types/drivers";
import { Filter } from "~/types/filter";
import { type InfractionType } from "~/types/infractions";
import {
  type Parcel,
  type Size,
  type DeliveryType,
  type Status,
  type FailureReason,
  STATUS,
} from "~/types/parcels";
import { type QuestType, type QuestFreq } from "~/types/quests";
import { type VehicleType } from "~/types/vehicles";
import { isAllUnchecked } from "./filter";

// Helper function to generate a random integer within a range
function getRandomIntInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Generate a random parcel
function generateParcel(): Parcel {
  const status = ["UNDELIVERED", "ATTEMPTED", "DELIVERED"];
  const sizes: Size[] = ["XS", "S", "M", "L"];
  const deliveryTypes: DeliveryType[] = ["CONTACTLESS", "IN_PERSON", "RETURN"];
  const driver: Driver = {
    name: "John Doe",
    licenseNumber: "123456",
    vehicleType: "VAN",
    homeStation: "Station A",
    parcels: [],
    questInstances: [],
    infraction: [],
  };
  const failureReasons: FailureReason[] = ["CANNOT_MAKE_IT", "NOT_HOME"];
  const trackingNumber = `T${getRandomIntInRange(1000, 9999)}`;
  const assignedDate: Date = new Date();
  const deliveryDate: Date | null = Math.random() < 0.5 ? new Date() : null;
  const size = sizes[getRandomIntInRange(0, sizes.length - 1)] as Size;
  const recipientName = "Jane Smith";
  const address = "123 Main St, Anytown, USA";
  const type = deliveryTypes[
    getRandomIntInRange(0, deliveryTypes.length - 1)
  ] as DeliveryType;
  const isCash: boolean = Math.random() < 0.5 ? true : false;
  const driverName = `Driver ${getRandomIntInRange(1, 10)}`;
  const vehicleTypes: VehicleType[] = [
    "VAN",
    "MOTORCYCLE",
    "CAR_SEDAN",
    "CAR_SUV",
    "LORRY",
  ];
  const driverVehicleType = vehicleTypes[
    getRandomIntInRange(0, vehicleTypes.length - 1)
  ] as VehicleType;
  const infractionTypes: InfractionType[] = [
    "FAKE_FAILURE",
    "NO_PROOF_OF_RECEIPT",
  ];
  const questTypes: QuestType[] = ["ATTENDANCE", "SUCCESSFUL"];
  const questFreqs: QuestFreq[] = ["DAILY", "REPEATABLE"];

  return {
    trackingNumber,
    assignedDate,
    deliveryDate,
    size,
    recipientName,
    address,
    type,
    isCash,
    driver: {
      name: driverName,
      licenseNumber: "123456",
      vehicleType: driverVehicleType,
      homeStation: "Station A",
      parcels: [],
      questInstances: [],
      infraction: [],
    },
    status: status[getRandomIntInRange(0, status.length - 1)] as Status,
    failureReason: failureReasons[
      getRandomIntInRange(0, failureReasons.length - 1)
    ] as FailureReason,
  };
}

// Generate an array of n random parcels
export function generateParcels(n: number): Parcel[] {
  const parcels: Parcel[] = [];
  for (let i = 0; i < n; i++) {
    parcels.push(generateParcel());
  }
  return parcels;
}

export const generateFilterParcel = (search: string, filter: Filter) => {
  return (parcel: Parcel) => {
    let searchBool;

    if (search === "") {
      searchBool = true;
    } else {
      searchBool =
        parcel.trackingNumber.includes(search) ||
        parcel.address.includes(search) ||
        parcel.recipientName.includes(search);
    }

    let filterBool = true;
    if (!isAllUnchecked(filter.Type)) {
      filterBool =
        filterBool &&
        ((filter.Type.Contactless && parcel.type === "CONTACTLESS") ||
          (filter.Type["In-person"] && parcel.type === "IN_PERSON") ||
          (filter.Type.Return && parcel.type === "RETURN"));
    }
    if (!isAllUnchecked(filter.Size)) {
      filterBool =
        filterBool &&
        ((filter.Size.XS && parcel.size === "XS") ||
          (filter.Size.S && parcel.size === "S") ||
          (filter.Size.M && parcel.size === "M") ||
          (filter.Size.L && parcel.size === "L"));
    }
    if (!isAllUnchecked(filter.Cash)) {
      filterBool =
        filterBool &&
        ((filter.Cash.Cash && parcel.isCash) ||
          (filter.Cash.Cashless && !parcel.isCash));
    }

    return searchBool && filterBool;
  };
};
