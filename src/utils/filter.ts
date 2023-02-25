import { type Filter } from "~/types/filter";

export const initUncheckedFilter = () => {
  const uncheckedFilter: Filter = {
    Type: {
      Contactless: false,
      "In-person": false,
      Return: false,
    },
    Size: {
      XS: false,
      S: false,
      M: false,
      L: false,
    },
    Cash: {
      Cash: false,
      Cashless: false,
    },
  };

  return uncheckedFilter;
};

export const initFilterForRender = () => {
  return {
    Type: ["Contactless", "In-person", "Return"],
    Size: ["XS", "S", "M", "L"],
    Cash: ["Cash", "Cashless"],
  };
};

export const isAllUnchecked = (obj: Record<string, boolean>) => {
  return Object.values(obj).reduce((acc, val) => acc && !val, true);
};
