import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { InputTextField } from "../../components/Inputs/InputTextField";
import InputPassword from "../../components/Inputs/InputPassword";
import { AuthContext } from "../../contexts/auth";
import { LoadingButton } from "@mui/lab";
import Container from "../../components/Container";
import { useNavigate } from "react-router-dom";
import BasicSelect from "../../components/Selects/BasicSelect";
import { SelectChangeEvent } from "@mui/material";
import { categoryService } from "../../services/categories";
import { Category } from "../../services/types/Category";

interface ErrorsValidationRegister {
  email?: string;
  name?: string;
  password?: string;
}

export const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [errorsValidation, setErrorsValidation] =
    useState<ErrorsValidationRegister>({});
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const handleListCategories = async () => {
    const findCategories = await categoryService.findAll();
    setCategories(findCategories);
  };
  
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  async function register() {
    setLoading(true);
    try {
      const response = await context.register({ email, password, name, category });
      setLoading(false);

      if(response?.error) {
        setError("");
      }
      else{
        navigate("/login");
      }
    } catch (e: unknown) {
      setError("");
      setLoading(false);

      if (e instanceof Error) {
        setErrorsValidation({
          email: e.message.includes("email") ? "Invalid email" : undefined,
          name: e.message.includes("name") ? "Invalid name" : undefined,
          password: e.message.includes("password")
            ? "Invalid password"
            : undefined,
        });
      }
    }
  }

  useEffect(() => {
    handleListCategories();
  }, []);

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

        <InputTextField
          onChange={setName}
          label="Digite seu nome"
          error={errorsValidation.name}
        />

        <InputPassword
          onChange={setPassword}
          error={errorsValidation.password}
        />

        <BasicSelect
          onChange={handleSelectChange}
          categories={categories}/>

        {error && <span style={{ color: "red" }}>{error}</span>}
        <LoadingButton
          variant="outlined"
          color="primary"
          loading={loading}
          style={{ backgroundColor: "#fff", width: "50%", marginTop: "2vh" }}
          onClick={register}
        >
          CADASTRAR
        </LoadingButton>
        {/* <p style={{textDecoration: 'underline', textAlign: 'center', marginTop: '2vh', cursor: 'pointer'}} onClick={() => navigate('/recovery-password')}>Esqueceu sua senha?</p> */}
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
