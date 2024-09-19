import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Users } from "../../services/types/Users";
import { useState } from "react";
import { userService } from "../../services/users";

export default function RecipeReviewCard({ user }: { user: Users }) {
  const [isFavorite, setIsFavorite] = useState(false); // Estado para controlar se é favorito ou não

  const handleFavoriteClick = async (userId: number, friendId: number) => {
    setIsFavorite(!isFavorite);
    
      const response = await userService.friendshipRequest(userId, friendId);
      console.log(response);

    
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "1vw" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.name.replace(/\s+/g, "").substring(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user.name}
        subheader={user.email}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {user.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => handleFavoriteClick(1, user.id)} 
        >
          <FavoriteIcon  color={isFavorite ? "error" : "disabled"} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
