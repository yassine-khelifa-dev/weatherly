import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import moment from "moment/min/moment-with-locales";
import "moment/locale/ar.js";

type TempType = {
  name: string;
  number: number;
  min: number;
  max: number;
  description: string;
  icon: string;
};

type UiLanguge = "en" | "ar";

export default function WeatherDetailsPage() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<UiLanguge>("ar");
  const [temp, setTemp] = useState<TempType | null>();

  const dateAndTime = moment().locale(lang).format("MMMM Do YYYY, h:mm a");

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const getData = async () => {
      axios
        .get(
          "https://api.openweathermap.org/data/2.5/weather?q=milano&appid=6a4aa22e0779478dd1502914c88fbd34",
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
          {lang === "ar" && (
            <Button
              variant="text"
              style={{
                color: "gray",
                fontSize: "16px",
              }}
              onClick={() => setLang("en")}
            >
              ENGLISH{"  "}
              <GTranslateIcon
                style={{
                  fontSize: "20px",
                }}
              />{" "}
            </Button>
          )}
          {lang === "en" && (
            <Button
              variant="text"
              style={{
                color: "gray",
                fontSize: "16px",
              }}
              onClick={() => setLang("ar")}
            >
              ARABIC{"  "}
              <GTranslateIcon
                style={{
                  fontSize: "20px",
                }}
              />{" "}
            </Button>
          )}
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
                {t(temp.name)}
              </Typography>

              <Typography
                variant="h5"
                component="h2"
                style={{ marginLeft: "15px" }}
              >
                {dateAndTime}
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
                    alt={t(`weather.${temp.description}`)}
                  />
                </Typography>

                <Typography variant="h5" component="h5">
                  {t(`weather.${temp.description}`)}
                </Typography>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "1px",
                  }}
                >
                  <h5>
                    {t("highest")}: {temp.max}°
                  </h5>
                  <h5>|</h5>
                  <h5>
                    {t("lowest")}: {temp.min}°
                  </h5>
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
