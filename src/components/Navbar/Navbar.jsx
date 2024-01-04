import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { List, ListItem, Collapse } from "@mui/material";

import makeStyles from "./styles";
import recollections from "../../assets/recollections.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const classes = makeStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const small = useMediaQuery("(max-width:600px)");
  const full = useMediaQuery("(min-width:600px)");

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/");
    setUser(null);
    window.location.reload(false);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  //className={classes.appBar}

  return (
    <div className={classes.appBar} position="static" color="inherit">
      {small && (
        <AppBar className={classes.appBar} position="static" color="inherit">
          <List>
            <ListItem>
              <Button onClick={handleClick}>
                <MenuIcon />
              </Button>
              <Typography
                component={Link}
                to="/"
                className={classes.heading}
                variant="h6"
                align="center"
              >
                media
              </Typography>
              <img
                className={classes.image}
                src={recollections}
                alt="recollections"
                height="60"
                sm="hidden"
              />
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem>
                  {user && (
                    <List component="div" disablePadding>
                      <ListItem>
                        <Avatar
                          className={classes.purple}
                          alt={user.result.name}
                          src={user.result.picture}
                        >
                          {user.result.name.charAt(0)}
                        </Avatar>
                      </ListItem>
                      <ListItem>
                        <Typography
                          className={classes.userName}
                          variant="h6"
                          sm="hidden"
                        >
                          {user.result.name}
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Button
                          variant="contained"
                          className={classes.logout}
                          color="secondary"
                          onClick={logout}
                        >
                          logout
                        </Button>
                      </ListItem>
                    </List>
                  )}
                </ListItem>
                <ListItem>
                  {!user && (
                    <Button
                      component={Link}
                      to="/auth"
                      variant="contained"
                      color="primary"
                    >
                      sign in
                    </Button>
                  )}
                </ListItem>
              </List>
            </Collapse>
          </List>
        </AppBar>
      )}

      {full && (
        <AppBar
          sx={{ flexDirection: "row" }}
          className={classes.appBar}
          position="static"
          color="inherit"
        >
          <div className={classes.brandContainer}>
            <Typography
              component={Link}
              to="/"
              className={classes.heading}
              variant="h2"
              align="center"
            >
              media
            </Typography>
            <img
              className={classes.image}
              src={recollections}
              alt="recollections"
              height="60"
              sm="hidden"
            />
          </div>
          <Toolbar className={classes.toolbar}>
            {user ? (
              <div className={classes.profile}>
                <Avatar
                  className={classes.purple}
                  alt={user.result.name}
                  src={user.result.picture}
                >
                  {user.result.name.charAt(0)}
                </Avatar>
                <Typography
                  className={classes.userName}
                  variant="h6"
                  sm="hidden"
                >
                  {user.result.name}
                </Typography>
                <Button
                  variant="contained"
                  className={classes.logout}
                  color="secondary"
                  onClick={logout}
                >
                  logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/auth"
                  variant="contained"
                  color="primary"
                >
                  sign in
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
};

export default Navbar;
