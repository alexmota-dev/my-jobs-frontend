import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Post } from "../../services/types/Book";

interface PostCardProps {
  key: number;
  post: Post;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string) => void;
}

export default function PostCard({
  post,
  handleDelete,
  handleUpdate,
}: PostCardProps) {
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "300px",
        height: "700px",
        margin: "1vw",
      }}
    >
      <CardActionArea>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={post.url}
            width={300}
            height={450}
            alt={post.title}
            style={{
              objectFit: "fill",
            }}
          ></img>
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {post.storyline}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >

        <Button
          size="small"
          color="primary"
          onClick={() => handleUpdate(post.id)}
        >
          <EditIcon />
        </Button>

        <Button size="small" color="primary">
          Adicionar ao carinho
        </Button>

        <Button
          size="small"
          color="primary"
          onClick={() => handleDelete(post.id)}
        >
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
