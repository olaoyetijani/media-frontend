/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";
import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
