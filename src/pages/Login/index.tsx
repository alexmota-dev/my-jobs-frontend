import React, { useContext } from "react";
import { useState } from "react";
import { InputTextField } from "../../components/Inputs/InputTextField";
import InputPassword from "../../components/Inputs/InputPassword";
import { AuthContext } from "../../contexts/auth";
import LoadingButton from "@mui/lab/LoadingButton";
import Container from "../../components/Container";
import { useNavigate } from "react-router-dom";

interface ErrorsValidationLogin {
  email?: string;
  password?: string;
  // adicionar outras proprieades aqui depois
}

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorsValidation, setErrorsValidation] =
    useState<ErrorsValidationLogin>({});
  const [loading, setLoading] = React.useState(false);

  const context = useContext(AuthContext);
  const navigate = useNavigate();

  async function login() {
    setLoading(true);
    try {
      await context.login({ email, password });
      setLoading(false);
    } catch (e: unknown) {
      setError("");
      setLoading(false);

      if (e instanceof Error) {
        // Verifica se o erro é uma instância de Error e passa a mensagem ou qualquer outro dado relevante
        setErrorsValidation({
          email: e.message.includes("email") ? "Invalid email" : undefined,
          password: e.message.includes("password")
            ? "Invalid password"
            : undefined,
        });
      }
    }
  }

  return (
    <Container>
      <div
        style={{
          width: "20%",
          margin: "10vh auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <InputTextField
          onChange={setEmail}
          label="Digite seu email"
          error={errorsValidation.email}
        />
        <InputPassword
          onChange={setPassword}
          error={errorsValidation.password}
        />
        {error && <span style={{ color: "red" }}>{error}</span>}
        <LoadingButton
          variant="outlined"
          size="small"
          onClick={login}
          loading={loading}
          style={{ backgroundColor: "#fff1", width: "50%", marginTop: "2vh" }}
        >
          Entrar
        </LoadingButton>
        <p
          style={{
            textDecoration: "underline",
            textAlign: "center",
            marginTop: "2vh",
            cursor: "pointer",
          }}
          onClick={() => navigate("/recovery-password")}
        >
          Esqueceu sua senha?
        </p>
      </div>
    </Container>
  );
};
