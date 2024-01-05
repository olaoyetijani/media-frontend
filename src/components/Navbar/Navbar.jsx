import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { List, ListItem, Collapse } from "@mui/material";
import recollections from "../../assets/recollections.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
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
    <div
      sx={{
        borderRadius: 15,
        margin: "30px 0",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 25px",
      }}
      position="static"
      color="inherit"
    >
      {small && (
        <AppBar
          sx={{
            borderRadius: 15,
            margin: "30px 0",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 25px",
          }}
          position="static"
          color="inherit"
        >
          <List>
            <ListItem>
              <Button onClick={handleClick}>
                <MenuIcon />
              </Button>
              <Typography
                component={Link}
                to="/"
                sx={{ color: "rgba(0, 183, 255, 1)", textDecoration: "none" }}
                variant="h6"
                align="center"
              >
                media
              </Typography>
              <img
                sx={{ marginLeft: "15px", width: "25%", height: "25%" }}
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
                          sx={{
                            color: "primary.main",
                            background: "primary.main",
                          }}
                          alt={user.result.name}
                          src={user.result.picture}
                        >
                          {user.result.name.charAt(0)}
                        </Avatar>
                      </ListItem>
                      <ListItem>
                        <Typography
                          sx={{ display: "flex", alignItems: "center" }}
                          variant="h6"
                          sm="hidden"
                        >
                          {user.result.name}
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Button
                          variant="contained"
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
          sx={{
            flexDirection: "row",
            borderRadius: 15,
            margin: "30px 0",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 25px",
          }}
          position="static"
          color="inherit"
        >
          <div sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              component={Link}
              to="/"
              sx={{ color: "rgba(0, 183, 255, 1)", textDecoration: "none" }}
              variant="h2"
              align="center"
            >
              media
            </Typography>
            <img
              sx={{ marginLeft: "15px", width: "25%", height: "25%" }}
              src={recollections}
              alt="recollections"
              height="60"
              sm="hidden"
            />
          </div>
          <Toolbar
            sx={{ display: "flex", justifyContent: "flex-end", width: "400px" }}
          >
            {user ? (
              <div
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "400px",
                }}
              >
                <Avatar
                  sx={{ color: "primary.main", background: "primary.main" }}
                  alt={user.result.name}
                  src={user.result.picture}
                >
                  {user.result.name.charAt(0)}
                </Avatar>
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  variant="h6"
                  sm="hidden"
                >
                  {user.result.name}
                </Typography>
                <Button variant="contained" color="secondary" onClick={logout}>
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
