import { makeStyles } from "@mui/styles";
import { deepPurple } from "@mui/material/colors";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 25px",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  image: {
    marginLeft: "15px",
    width: "25%",
    height: "25%",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  user: {
    display: "flex",
    flexDirection: "column",
    justifyConten: "center",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
