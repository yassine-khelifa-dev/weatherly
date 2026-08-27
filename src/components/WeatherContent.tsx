import { Box, Button, Container } from "@mui/material";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import { useEffect, useState } from "react";
import axios from "axios";
import "moment/locale/ar.js";
import type {
  UiLanguage,
  WeatherDetailsPageProps,
  WeatherType,
} from "../types/weather";
import { fetchWeather } from "../services/weatherApi";
import WeatherCard from "./WeatherCard";
import Loading from "./Loading";
import Error from "./Error";

export default function WeatherContent({ city }: WeatherDetailsPageProps) {
  const [lang, setLang] = useState<UiLanguage>("en");

  const [temp, setTemp] = useState<WeatherType | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

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

        const response = await fetchWeather(city);
        setTemp(response);
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
        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
        {/*  loading */}
        <Loading value={loading} temp={temp !== null} city={city} />

        {/* Error */}
        <Error error={error} loading={loading} />
      </Box>

      {/* =====================
          Weather Card
      ====================== */}
      {temp && <WeatherCard loading={loading} temp={temp} lang={lang} />}

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
    </Container>
  );
}
