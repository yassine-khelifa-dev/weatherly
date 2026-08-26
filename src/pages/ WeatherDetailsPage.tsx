import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import { useEffect, useState } from "react";
import axios from "axios";

type TempType = {
  name: string
  number: number;
  min: number;
  max: number;
  description: string;
  icon: string;
};

export default function WeatherDetailsPage() {
  const [temp, setTemp] = useState<TempType | null>();

  useEffect(() => {
    const getData = async () => {
      axios
        .get(
          "https://api.openweathermap.org/data/2.5/weather?q=Singapore&appid=6a4aa22e0779478dd1502914c88fbd34",
        )
        .then((response) => {
          console.log(Math.round(response.data.main.temp - 273.15));

          setTemp({
            name: response.data.name,
            number: Math.round(response.data.main.temp - 273.15),
            min: Math.round(response.data.main.temp_min - 273.15),
            max: Math.round(response.data.main.temp_max - 273.15),
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
          });
        })
        .catch((err) => console.error(err));
    };
    getData();
  }, []);

  if (!temp) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container
        maxWidth="sm"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* TranslateIcon */}
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            width: "100%",
            padding: "10px 0px",
          }}
        >
          <Button
            variant="text"
            style={{
              color: "gray",
              fontSize: "16px",
            }}
          >
            Fr{"  "}
            <GTranslateIcon
              style={{
                fontSize: "20px",
              }}
            />{" "}
          </Button>

          <Button
            variant="text"
            style={{
              color: "gray",
              fontSize: "16px",
            }}
          >
            It{"  "}
            <GTranslateIcon
              style={{
                fontSize: "20px",
              }}
            />{" "}
          </Button>
        </div>

        {/* Card */}
        <div
          style={{
            background: "rgba(19, 16, 193, 1)",
            color: "white",
            width: "100%",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0px 10px 2px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Content */}
          <div>
            {/* City - Date  */}
            <div
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
                gap: "10px",
              }}
            >
              <Typography
                variant="h2"
                component="h2"
                style={{ marginLeft: "5px" }}
              >
                {temp.name}
              </Typography>

              <Typography
                variant="h5"
                component="h2"
                style={{ marginLeft: "15px" }}
              >
                Sun 26
              </Typography>
            </div>

            <hr />
            {/* Details   */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>
                <Typography
                  variant="h1"
                  component="h1"
                  style={{ marginLeft: "5px" }}
                >
                  {temp.number}°
                  
                  <img
                    src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`}
                    alt={temp.description}
                  />
                </Typography>

                <Typography variant="h5" component="h5">
                  {temp.description}
                </Typography>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "1px",
                  }}
                >
                  <h5>heighest: {temp.max}°</h5>
                  <h5>|</h5>
                  <h5>lowest: {temp.min}°</h5>
                </div>
              </div>

              <div>
                <CloudIcon
                  style={{
                    fontSize: "170px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
