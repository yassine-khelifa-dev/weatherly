import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import CloudIcon from "@mui/icons-material/Cloud";
import GTranslateIcon from "@mui/icons-material/GTranslate";

import { useEffect, useState } from "react";
import axios from "axios";

import { useTranslation } from "react-i18next";

import moment from "moment/min/moment-with-locales";
import "moment/locale/ar.js";

/* =========================
   Types
========================= */

type TempType = {
  name: string;
  number: number;
  min: number;
  max: number;
  description: string;
  icon: string;
};

type UiLanguage = "en" | "ar";

type WeatherDetailsPageProps = {
  city: string;
};

/* =========================
   Helper
   Only for testing loading
========================= */

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/* =========================
   Component
========================= */

export default function WeatherDetailsPage({ city }: WeatherDetailsPageProps) {
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState<UiLanguage>("ar");

  const [temp, setTemp] = useState<TempType | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  /* =========================
     Date
  ========================= */

  const dateAndTime = moment().locale(lang).format("MMMM Do YYYY, h:mm a");

  /* =========================
     Change language
  ========================= */

  useEffect(() => {
    i18n.changeLanguage(lang);

    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.documentElement.lang = lang;
  }, [lang, i18n]);

  /* =========================
     Fetch weather
  ========================= */

  useEffect(() => {
    if (!city.trim()) {
      return;
    }

    const getData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Only for testing the loading UI.
        // Remove this later.
        await delay(700);

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6a4aa22e0779478dd1502914c88fbd34`,
        );

        console.log("Call for:", city);

        setTemp({
          name: response.data.name,

          number: Math.round(response.data.main.temp - 273.15),

          min: Math.round(response.data.main.temp_min - 273.15),

          max: Math.round(response.data.main.temp_max - 273.15),

          description: response.data.weather[0].description,

          icon: response.data.weather[0].icon,
        });
      } catch (error) {
        console.error(error);

        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setError(`City "${city}" not found`);
        } else {
          setError("Something went wrong while loading the weather");
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [city]);

  /* =========================
     JSX
  ========================= */

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",

        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* =====================
          Language button
      ====================== */}

      <Box
        sx={{
          width: "100%",

          display: "flex",
          justifyContent: "flex-end",

          mb: 1,
        }}
      >
        <Button
          variant="text"
          onClick={() => setLang(lang === "ar" ? "en" : "ar")}
          startIcon={<GTranslateIcon />}
          sx={{
            color: "gray",
            fontSize: "15px",
          }}
        >
          {lang === "ar" ? "ENGLISH" : "ARABIC"}
        </Button>
      </Box>

      {/* =====================
          Status Area

          Initial loading
          Updating
          Error
      ====================== */}

      <Box
        sx={{
          width: "100%",
          minHeight: "65px",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          mb: 1,
        }}
      >
        {/* First loading */}

        {loading && !temp && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <CircularProgress size={32} />

            <Typography
              sx={{
                color: "white",
              }}
            >
              Loading weather...
            </Typography>
          </Box>
        )}

        {/* Updating existing weather */}

        {loading && temp && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <CircularProgress size={22} />

            <Typography
              sx={{
                color: "white",
                fontSize: "14px",
              }}
            >
              Loading {city}...
            </Typography>
          </Box>
        )}

        {/* Error */}

        {error && !loading && (
          <Alert
            severity="error"
            sx={{
              width: "100%",
              borderRadius: "10px",
            }}
          >
            {error}
          </Alert>
        )}
      </Box>

      {/* =====================
          Weather Card
      ====================== */}

      {temp && (
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
      )}
    </Container>
  );
}
