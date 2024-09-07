import React, { useContext } from 'react';
import { ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { InputTextField } from '../../components/Inputs/InputTextField';
import InputPassword from '../../components/Inputs/InputPassword';
import { Menu } from '../../components/Menu';
import { theme } from '../../Theme';
import { AuthContext } from '../../contexts/auth';
import { LoadingButton } from '@mui/lab';

interface ErrorsValidation {
  email?: string;
  name?: string;
  password?: string;
  // adicionar outras proprieades aqui depois
}

export const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorsValidation, setErrorsValidation] = useState<ErrorsValidation>({});
  const [loading, setLoading] = React.useState(false);

  const context = useContext(AuthContext);

  async function register() {
    setLoading(true);
    try {
      await context.register({ email, password, name });
      setLoading(false);
    } catch (e: unknown) {
      setError('');
      setLoading(false);
  
      if (e instanceof Error) {
        // Verifica se o erro é uma instância de Error e passa a mensagem ou qualquer outro dado relevante
        setErrorsValidation({
          email: e.message.includes('email') ? 'Invalid email' : undefined,
          name: e.message.includes('name') ? 'Invalid name' : undefined,
          password: e.message.includes('password') ? 'Invalid password' : undefined,
        });
      } else {
        console.log('Erro não identificado');
      }
  
      console.log(e);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Menu />
      <div style={{ width: '20%', margin: '10vh auto', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <InputTextField
          onChange={setEmail}
          label='Digite seu email'
          error={errorsValidation.email}/>
        <InputTextField
          onChange={setName}
          label='Digite seu nome'
          error={errorsValidation.name}/>
        <InputPassword
          onChange={setPassword}
          error={errorsValidation.password}/>
        {error && <span style={{color: 'red'}}>{error}</span>}
        <LoadingButton
          variant='outlined'
          color='primary'
          loading={loading}
          style={{backgroundColor: '#fff', width: '50%', marginTop: '2vh'}}
          onClick={register}
           >
            CADASTRAR
        </LoadingButton>
        {/* <p style={{textDecoration: 'underline', textAlign: 'center', marginTop: '2vh', cursor: 'pointer'}} onClick={() => navigate('/recovery-password')}>Esqueceu sua senha?</p> */}
        <p
          style={{
            textDecoration: 'underline',
            textAlign: 'center',
            marginTop: '2vh',
            cursor: 'pointer'}}
          onClick={() => console.log("Deveria levar para a rota /recovery-password")}>
            Esqueceu sua senha?
        </p>

      </div>
    </ThemeProvider>
  )
}