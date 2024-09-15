import { useEffect, useState } from "react";
import Container from "../../components/Container";
// import { useNavigate } from "react-router-dom";
import ListOfProfiles from "../../components/ListOfProfiles";
import { Users } from "../../services/types/Users";
import { userService } from "../../services/users";

export default function Home() {
  const [users, setUsers] = useState<Users[]>([]);
  // const navigate = useNavigate();

  const handleLisUsers = async () => {
    const findUsers = await userService.findAll();
    setUsers(findUsers);
  };

  useEffect(() => {
    handleLisUsers();
  }, []);

  return (
    <Container>
      <div
        className="home"
        style={{
          height: "100%",
          width: "100%",
        }}>
        <ListOfProfiles
          key={users.length}
          users={users}
        />
      </div>
    </Container>
  );
}
