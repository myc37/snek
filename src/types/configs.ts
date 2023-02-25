export type AdminConfig = Map<Country, CountryConfig>;

export const COUNTRY = {
  SG: "SG",
} as const;
export type Country = keyof typeof COUNTRY;
