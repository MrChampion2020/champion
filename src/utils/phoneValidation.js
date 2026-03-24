import { DEFAULT_PHONE_COUNTRY, PHONE_COUNTRIES } from "../data/phoneCountries";

const phoneCountryMap = new Map(
  PHONE_COUNTRIES.map((country) => [country.iso2, country])
);

export const normalizePhoneNumber = (value = "") =>
  value
    .trim()
    .replace(/[\s().-]/g, "")
    .replace(/^00/, "+");

export const normalizeLocalPhoneNumber = (value = "") =>
  value.trim().replace(/[^\d]/g, "");

export const getPhoneCountry = (iso2 = DEFAULT_PHONE_COUNTRY) =>
  phoneCountryMap.get(iso2) || phoneCountryMap.get(DEFAULT_PHONE_COUNTRY);

export const buildInternationalPhoneNumber = (
  value = "",
  countryIso2 = DEFAULT_PHONE_COUNTRY
) => {
  const normalized = normalizePhoneNumber(value);

  if (normalized.startsWith("+")) {
    return normalized;
  }

  const country = getPhoneCountry(countryIso2);
  const localNumber = normalizeLocalPhoneNumber(value).replace(/^0+/, "");

  if (!country || !localNumber) {
    return "";
  }

  return `${country.dialCode}${localNumber}`;
};

export const isValidPhoneNumber = (
  value = "",
  countryIso2 = DEFAULT_PHONE_COUNTRY
) => /^\+[1-9]\d{6,14}$/.test(buildInternationalPhoneNumber(value, countryIso2));

export const isValidInternationalPhone = isValidPhoneNumber;
