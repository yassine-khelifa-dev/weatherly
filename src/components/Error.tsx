import { Alert } from "@mui/material";

type Props = {
  error: string;
  loading: boolean;
};

export default function Error({ error, loading }: Props) {
  return (
    <>
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
    </>
  );
}
