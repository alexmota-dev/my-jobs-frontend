import { Post } from "../../services/types/Book";
import PostCard from "../PostCard";

export default function ListOfPosts({
  posts,
  handleDelete,
  handleUpdate,
}: {
  posts: Post[];
  handleDelete: (id: string) => void;
  handleUpdate: (id: string) => void;
}) {
  return (
    <div
      className="listOfPosts"
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "1vw",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      {posts.map((post, index) => (
        <PostCard
          key={index}
          post={post}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}
