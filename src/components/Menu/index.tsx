import "./style.css";
import { useContext } from "react";
import { theme } from "../../Theme";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge, Button, IconButton, Stack } from "@mui/material";
import logo from "../../assets/logo.png";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../contexts/auth";
import MailIcon from '@mui/icons-material/Mail';

export function Menu() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  function logout() {
    context.logout();
  }

  function notificationsLabel(count: number) {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 99) {
      return 'more than 99 notifications';
    }
    return `${count} notifications`;
  }

  //Esse componete precisa ser responsivo em uma versão mobile
  return (
    <div
      className="menu"
      style={{
        backgroundColor: theme.palette.primary.main,
        height: "10vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        flexWrap: "wrap",
        padding: "0.5vw",
        borderBottom: "1px solid #fff",
        margin: "0",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        style={{
          marginRight: "1vw",
        }}
      >
        <a href="/">
          <img alt="HOME" src={logo} style={{ width: "2vw" }} />
        </a>

        <Button
          onClick={() => navigate(`/add-books`)}
          variant="outlined"
          startIcon={<InfoIcon />}
          style={{
            marginRight: "1vw",
          }}
        >
          Adicionar Posts
        </Button>
      </Stack>

      <Stack
        direction="row"
        spacing={3}
        style={{
          marginRight: "2vw",
        }}
      >
        {context.signed ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >

            <div
              style={{ marginRight: "1vw" }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 56, height: 56 }}
              />
            </div>

            <div
              style={{ marginRight: "1vw" }}
            >
              <IconButton aria-label={notificationsLabel(100)}>
                <Badge badgeContent={3} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
            </div>

            <div
              style={{ marginRight: "1vw" }}
            >
              <Button
                variant="contained"
                color="primary"
                endIcon={<LogoutIcon />}
                onClick={logout}
              >
                Sair
              </Button>
            </div>

          </div>
        ) : (
          <>
            <Button
              color="primary"
              variant="contained"
              onClick={() => navigate(`/login`)}
            >
              Entrar
            </Button>

            <Button
              color="primary"
              variant="contained"
              onClick={() => navigate(`/register`)}
            >
              Cadastrar
            </Button>
          </>
        )}
      </Stack>
    </div>
  );
}
