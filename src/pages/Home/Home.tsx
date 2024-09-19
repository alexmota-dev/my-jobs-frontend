import { useContext, useEffect, useState } from "react";
import Container from "../../components/Container";
import ListOfProfiles from "../../components/ListOfProfiles";
import { Users } from "../../services/types/Users";
import { userService } from "../../services/users";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { Tab, Box } from "@mui/material";
import { AuthContext } from "../../contexts/auth";

export default function Home() {
  const [allUsers, setAllUsers] = useState<Users[]>([]);
  const [recomendationUsers, setRecomendationUsers] = useState<Users[]>([]);
  const [friends, setFriends] = useState<Users[]>([]);
  const [tabValue, setTabValue] = useState("0");
  const context = useContext(AuthContext);

  console.log("EXIBINDO CONTEXTO QUNADO A PAGINA RECARREGAR", context);

  const handleInformationUser = async () => {
    const storagedUser = sessionStorage.getItem("@App:user");
    console.log(storagedUser);
  };

  const handleListAllUsers = async () => {
    const findUsers: Users[] = await userService.findAllUsers();

    if (findUsers.length === 0) {
      console.log("Nenhum usuário encontrado no sistema");
    }

    setAllUsers(findUsers);
  };

  const handleListAllFriends = async () => {
    const friends: Users[] = await userService.findFrindesUsers();

    if (friends.length === 0) {
      console.log("Nenhum usuário encontrado no sistema");
    }

    setFriends(friends);
  };

  const handleListAllUsersRecomendation = async (userId: number) => {
    const users: Users[] = await userService.findUsersRecomendation(userId);

    if (users.length === 0) {
      console.log("Nenhum usuário encontrado no sistema");
    }

    setRecomendationUsers(users);
  };

  const handleListAllFriendsReceived = async (userId: number) => {
    const users: Users[] = await userService.findReceivedFriends(userId);

    if (users.length === 0) {
      console.log("Nenhum usuário encontrado no sistema");
    }

    setRecomendationUsers(users);
  };

  useEffect(() => {
  const fetchData = async () => {
    try {
      // Executa todas as funções assíncronas em paralelo
      await Promise.all([
        handleListAllUsers(),
        handleListAllFriends(),
        handleListAllUsersRecomendation(1),
        handleInformationUser(),
        handleListAllFriendsReceived(1),
      ]);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  fetchData();
}, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      <div
        className="home"
        style={{
          height: "100%",
          width: "100%",
          color: "black",
        }}
      >
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="simple tabs example"
            >
              <Tab label="USUARIOS PROXIMOS" value="USUARIOS PROXIMOS" />
              <Tab label="TODOS" value="TODOS" />
              <Tab label="MEUS AMIGOS" value="MEUS AMIGOS" />
            </TabList>
          </Box>

          <TabPanel value="USUARIOS PROXIMOS">

            <ListOfProfiles
              key={recomendationUsers.length}
              users={recomendationUsers}
            />

          </TabPanel>
          <TabPanel value="TODOS">

            <ListOfProfiles
              key={allUsers.length}
              users={allUsers} />

          </TabPanel>
          <TabPanel value="MEUS AMIGOS">

            <ListOfProfiles
              key={friends.length}
              users={friends} />

          </TabPanel>
        </TabContext>
      </div>
    </Container>
  );
}
