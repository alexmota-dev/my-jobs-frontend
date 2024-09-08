import './style.css';
import { useContext } from 'react';
import { theme } from '../../Theme';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import logo from '../../assets/logo.png';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../contexts/auth';

export function Menu() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  function logout() {
    context.logout();
  }
  //Esse componete precisa ser responsivo em uma versão mobile
  return (
      <div
        className='menu'
        style={{
          backgroundColor: theme.palette.primary.main,
          height: '10vh',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          flexWrap: 'wrap',
          padding: '0.5vw',
          borderBottom: '1px solid #fff',
          margin : '0',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          style={{
            marginRight: '1vw',
          }}
        >
          <a href='/'>
            <img alt='HOME' src={logo} style={{ width: '2vw' }}/>
          </a>
          
          <Button
            onClick={() => navigate(`/add-books`)}
            variant="outlined"
            startIcon={<InfoIcon />}
            style={{
              marginRight: '1vw',
            }}>
            Adicionar Posts
          </Button>
        </Stack>

        <Stack
            direction="row"
            spacing={2}
            style={{
              marginRight: '2vw',
            }}
        >
          {context.signed ? (
            <Button
              variant="contained"
              endIcon={<LogoutIcon />}
              onClick={logout}>
                Sair
            </Button>
          ) : (
            <>
              <Button
                color='primary'
                variant="contained"
                onClick={() => navigate(`/login`)}>
                  Entrar
              </Button>

              <Button
                color='primary'
                variant="contained"
                onClick={() => navigate(`/register`)}>
                  Cadastrar
              </Button>
            </>
          )
          }
        </Stack>
    </div>
  );
}
