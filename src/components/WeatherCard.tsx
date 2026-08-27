import CloudIcon from "@mui/icons-material/Cloud";
import { Box, Typography } from "@mui/material";
import type { UiLanguage, WeatherType } from "../types/weather";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useEffect } from "react";

type Props = {
  loading: boolean;
  temp: WeatherType;
  lang: UiLanguage;
};

console.log("WeatherCard file loaded");

export default function WeatherCard({ loading, temp, lang }: Props) {
  const { t, i18n } = useTranslation();
  const dateAndTime = moment
    .utc()
    .add(temp.timezone, "seconds")
    .locale(lang)
    .format("MMMM Do YYYY, h:mm a");

  /* =========================
       Change language
    ========================= */

  useEffect(() => {
    i18n.changeLanguage(lang);
  console.log("WeatherCard - useEffect",temp.name, temp.timezone);

    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.documentElement.lang = lang;
  }, [lang, i18n]);

  return (
    <>
      <Box
        sx={{
          width: "100%",

          background: "rgba(19, 16, 193, 1)",

          color: "white",

          p: 4,

          borderRadius: "15px",

          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.35)",

          opacity: loading ? 0.65 : 1,

          transition: "opacity 0.2s ease",
        }}
      >
        {/* =====================
              City + Date
          ====================== */}

        <Box
          sx={{
            display: "flex",

            alignItems: "flex-end",

            justifyContent: "flex-start",

            gap: 2,

            flexWrap: "wrap",
          }}
        >
          <Typography variant="h2" component="h2">
            {t(temp.name)}
          </Typography>

          <Typography
            variant="h6"
            component="p"
            sx={{
              opacity: 0.8,
              color: "#ffaa06",
            }}
          >
            {dateAndTime}
          </Typography>
        </Box>

        <Box
          component="hr"
          sx={{
            my: 2,

            border: 0,

            borderTop: "1px solid rgba(255,255,255,0.3)",
          }}
        />

        {/* =====================
              Weather Details
          ====================== */}

        <Box
          sx={{
            display: "flex",

            justifyContent: "space-between",

            alignItems: "center",

            gap: 3,
          }}
        >
          {/* Temperature */}

          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h1" component="h1">
                {temp.number}°
              </Typography>

              <Box
                component="img"
                src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`}
                alt={t(`weather.${temp.description}`)}
                sx={{
                  width: 100,
                  height: 100,
                }}
              />
            </Box>

            {/* Weather description */}

            <Typography
              variant="h5"
              component="p"
              sx={{
                mb: 2,
              }}
            >
              {t(`weather.${temp.description}`)}
            </Typography>

            {/* Min / Max */}

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 2,
              }}
            >
              <Typography>
                {t("highest")}: {temp.max}°
              </Typography>

              <Typography
                sx={{
                  opacity: 0.5,
                }}
              >
                |
              </Typography>

              <Typography>
                {t("lowest")}: {temp.min}°
              </Typography>
            </Box>
          </Box>

          {/* Big cloud icon */}

          <CloudIcon
            sx={{
              fontSize: {
                xs: "100px",
                sm: "160px",
              },

              opacity: 0.9,
            }}
          />
        </Box>
      </Box>
    </>
  );
}
