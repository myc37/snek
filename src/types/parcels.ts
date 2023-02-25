import { type Driver } from "./drivers";

export type Parcel = {
  trackingNumber: string;
  assignedDate: Date;
  deliveryDate: Date | null;
  size: Size;
  recipientName: string;
  address: string;
  type: DeliveryType;
  isCash: boolean;
  driver: Driver;
  status: Status;
  failureReason: FailureReason;
};

/**
 * Enums
 */
export const SIZE = {
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
} as const;
export type Size = keyof typeof SIZE;

export const FAILURE_REASON = {
  CANNOT_MAKE_IT: "Cannot make it",
  NOT_HOME: "Not home",
} as const;
export type FailureReason = keyof typeof FAILURE_REASON;

export const STATUS = {
  UNDELIVERED: "Undelivered",
  ATTEMPTED: "Attempted",
  DELIVERED: "Delivered",
} as const;
export type Status = keyof typeof STATUS;

export const DELIVERY_TYPE = {
  CONTACTLESS: "Contactless",
  IN_PERSON: "In-person",
  RETURN: "Return",
} as const;
export type DeliveryType = keyof typeof DELIVERY_TYPE;
