import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";



type Props = {
    city: string,
    setCity: (city: string) => void
}

export default function Searach({city, setCity}: Props) {
  return (
    <>
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
    </>
  );
}
