import { TextField, ThemeProvider } from "@mui/material";
import { theme } from "../../Theme";
import { useState } from "react";

export function InputTextField({
  onChange,
  label,
  error,
  value,
  type,
}: {
  onChange: (newValue: string) => void;
  label: string;
  error?: string;
  value?: string;
  type?: string;
}) {
  const [filled, setFilled] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilled(event.target.value !== "");
    onChange(event.currentTarget.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "100%",
          margin: "1vh 0 1vh 0",
        }}
      >
        <TextField
          sx={{
            backgroundColor: filled ? "#f8f8f8" : "white",
            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 100px #f8f8f8 inset", // Muda a cor de fundo quando preenchido automaticamente
            },
            "& input": {
              backgroundColor: filled ? "#f8f8f8" : "white", // Cor de fundo quando preenchido manualmente
            },
          }}
          type={type ?? "text"}
          value={value}
          error={!!error}
          helperText={error}
          id="outlined-basic"
          label={value ? "" : label}
          onChange={handleInputChange}
        />
      </div>
    </ThemeProvider>
  );
}
