import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import GTranslateIcon from "@mui/icons-material/GTranslate";
export default function WeatherDetailsPage() {
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
                Stockholm
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
                  27°
                </Typography>

                <Typography variant="h5" component="h5">
                  Broken Coulds
                </Typography>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "1px",
                  }}
                >
                  <h5>heighest: 30°</h5>
                  <h5>|</h5>
                  <h5>lowest: 10°</h5>
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
