/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";

// Get the current ID

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      navigate("/");
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      navigate("/");
      clear();
    }
  };

  if (!user?.result.name) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" align="center">
          Please sign in to create your own memories and like other's memories
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      <form
        style={{
          margin: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <Typography variant="h6">
          {currentId ? "Edit" : "Create"} a new post
        </Typography>
        <TextField
          sx={{ m: 2 }}
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          sx={{ m: 2 }}
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          sx={{ m: 2 }}
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />

        <div style={{ width: "97%", margin: "10px 0" }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>

        <Button
          sx={{ mb: 2 }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Post
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear Post
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
