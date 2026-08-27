/* =========================
   Types
========================= */

export type WeatherType = {
  name: string;
  number: number;
  min: number;
  max: number;
  description: string;
  icon: string;
  timezone?: number
};

export type UiLanguage = "en" | "ar";

export type WeatherDetailsPageProps = {
  city: string;
};
