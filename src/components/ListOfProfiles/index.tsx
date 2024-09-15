import { List } from "@mui/material";
import { Users } from "../../services/types/Users";
import RecipeReviewCard from "../RecipeReviewCard";

export default function ListOfProfiles({ users }: { users: Users[] }) {
  return (
    <div
      className="listOfProfiles"
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "1vw",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {users.map((user, index) => (
          <RecipeReviewCard key={index} user={user}></RecipeReviewCard>
        ))}
      </List>
    </div>
  );
}
