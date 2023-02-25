import { type Size } from "@prisma/client";

export type Filter = {
  Type: Record<"Contactless" | "In-person" | "Return", boolean>;
  Size: Record<Size, boolean>;
  Cash: Record<"Cash" | "Cashless", boolean>;
};
