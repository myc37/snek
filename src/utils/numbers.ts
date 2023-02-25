export const formatNumbersWithCommas = (num: number) => {
  return num.toLocaleString("en-US");
};

export const addCurrency = (value: string, country: string) => {
  switch (country) {
    case "SG": {
      return `S$${value}`;
    }

    default: {
      return value;
    }
  }
};
