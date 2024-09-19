import { List } from "@mui/material";
import { Users } from "../../services/types/Users";
import RecipeReviewCard from "../RecipeReviewCard";
import { ListOfProfilesSkeleton } from "../ListOfProfilesSkeleton";

export default function ListOfProfiles({ users }: { users: Users[] }) {
  return users && users.length > 0 ? (
    <div
      className="listOfProfiles"
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "1vw",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {users.map((user, index) => (
          <RecipeReviewCard key={index} user={user} />
        ))}
      </List>
    </div>
  ) : (
    <div
      className="listOfProfiles"
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "1vw",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <ListOfProfilesSkeleton />
    </div>
  );
}
