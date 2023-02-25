import { type Parcel } from ".prisma/client";
import { type Filter } from "~/types/filter";
import { isAllUnchecked } from "./filter";

export const generateFilterParcel = (search: string, filter: Filter) => {
  return (parcel: Parcel) => {
    let searchBool;
    if (search === "") {
      searchBool = true;
    } else {
      searchBool =
        parcel.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
        parcel.address.toLowerCase().includes(search.toLowerCase()) ||
        parcel.recipientName.toLowerCase().includes(search.toLowerCase());
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
