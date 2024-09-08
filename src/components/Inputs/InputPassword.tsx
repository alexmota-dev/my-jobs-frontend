import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { theme } from "../../Theme";
import { ThemeProvider } from "@mui/material";

export default function InputPassword({
  onChange,
  error,
  value,
}: {
  onChange: (value: string) => void;
  error?: string;
  value?: string;
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [filled, setFilled] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilled(event.target.value !== "");
    onChange(event.currentTarget.value)
  };

  return (
    <ThemeProvider theme={theme}>

      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">

        <InputLabel htmlFor="outlined-adornment-password">
          Digite sua senha
        </InputLabel>
        <OutlinedInput
          sx={{
            backgroundColor: filled ? "#f8f8f8" : "white",
            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 100px #f8f8f8 inset", // Muda a cor de fundo quando preenchido automaticamente
            },
            "& input": {
              backgroundColor: filled ? "#f8f8f8" : "white", // Cor de fundo quando preenchido manualmente
            },
          }}
          onChange={handleInputChange}
          value={value}
          error={!!error}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton                
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOff/>
                ) : (
                  <Visibility/>
                )}
              </IconButton>
            </InputAdornment>
          }
          label="Digite sua senha"
        />

        {!!error && (
          <FormHelperText error id="accountId-error">
            {error}
          </FormHelperText>
        )}

      </FormControl>

    </ThemeProvider>
  );
}
