import { useEffect, useState } from "react";
import WeatherDetailsPage from "./ WeatherDetailsPage";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  InputAdornment,
  TextField,
} from "@mui/material";

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
        <TextField
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "58px",
              color: "white",
              fontSize: "1.1rem",
              borderRadius: "14px",
              backgroundColor: "rgba(255,255,255,0.08)",

              "& fieldset": {
                borderColor: "rgba(255,255,255,0.35)",
              },

              "&:hover fieldset": {
                borderColor: "white",
              },

              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },

            "& input::placeholder": {
              color: "rgba(255,255,255,0.7)",
              opacity: 1,
            },
          }}
        />

        <WeatherDetailsPage city={deboundedCity} />
      </Box>
    </>
  );
}
