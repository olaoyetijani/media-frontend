import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Grow from "@mui/material/Grow";
import { getPosts } from "../../actions/posts";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems={"stretch"}
          style={{ display: "flex", flexDirection: "row" }}
          sx={{
            flexDirection: {
              sm: "column-reverse",
            },
          }}
        >
          <Grid item xs={12} sm={4} sx={{ mb: 5}}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>

          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
