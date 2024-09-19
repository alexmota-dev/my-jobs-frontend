import "./style.css";
import { useContext, useEffect, useState } from "react";
import { theme } from "../../Theme";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge, Box, Button, IconButton, Modal, Stack } from "@mui/material";
import logo from "../../assets/logo.png";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../contexts/auth";
import MailIcon from '@mui/icons-material/Mail';
import ListOfProfiles from "../ListOfProfiles";
import { Users } from "../../services/types/Users";
import { userService } from "../../services/users";

export function Menu() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [friendshipRequests, setFriendshipRequests] = useState<Users[]>([]);

  const handleListAllFriendshipRequests = async (userId: number) => {
    const friends: Users[] = await userService.findReceivedFriends(userId);

    if (friends.length === 0) {
      console.log("Nenhum usuário encontrado no sistema");
    }

    setFriendshipRequests(friends);
  };

  function logout() {
    context.logout();
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  function notificationsLabel(count: number) {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 99) {
      return 'more than 99 notifications';
    }
    return `${count} notifications`;
  }

  const handleOpenCloseModal = () => {
    setOpen(!open);
    if(open){
      handleListAllFriendshipRequests(8);
    }
  }

  useEffect(() => {
    handleListAllFriendshipRequests(9);
  }, []);
  

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
                  <MailIcon onClick={handleOpenCloseModal} />
                </Badge>
              </IconButton>
              <Modal
                open={open}
                onClose={handleOpenCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <ListOfProfiles
                    key={friendshipRequests.length}
                    users={friendshipRequests} />
                </Box>
              </Modal>
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
