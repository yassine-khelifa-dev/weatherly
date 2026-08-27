import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Searach from "../components/Search";
import WeatherContent from "../components/WeatherContent";

export default function HomePage() {
  const [city, setCity] = useState("Milano");
  const [deboundedCity, setDeboundedCity] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeboundedCity(city);
    }, 1000);

    return () => clearTimeout(timer);
  }, [city]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "680px",
          mx: "auto",
          mt: 4,

          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Searach city={city} setCity={setCity} />

        <WeatherContent city={deboundedCity} />
      </Box>
    </>
  );
}
