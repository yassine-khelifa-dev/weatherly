import {  Box, CircularProgress, Typography } from "@mui/material";

type Props = {
  value: boolean;
  temp: boolean;
  city: string;
};

export default function Loading({ value, temp, city }: Props) {
  return (
    <>
      {value && !temp && (
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

      {value && temp && (
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
    </>
  );
}
