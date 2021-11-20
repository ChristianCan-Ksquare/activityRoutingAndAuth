import { useState, useContext, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";

const useStyles = makeStyles((theme) => ({
  navBar: {
    backgroundColor: "#2E67F8",
    height: 50,
  },
  link: {
    color: "#FFFFFF",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function NavBar() {
  const classes = useStyles();
  const context = useContext(ThemeContext);

  const handleLogOut = () => {
    context.handleLogOut();
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      className={classes.navBar}
      mb={2}
    >
      <Box className={classes.link}>
        <Link to="/" style={{ textDecoration: "inherit", color: "inherit" }}>
          Landing Page
        </Link>
      </Box>
      <Box className={classes.link}>
        {context.logged ? (
          <Link
            to="/"
            className={classes.link}
            onClick={handleLogOut}
            style={{ textDecoration: "inherit", color: "inherit" }}
          >
            Log Out
          </Link>
        ) : (
          <Link
            to="/login"
            style={{ textDecoration: "inherit", color: "inherit" }}
          >
            Log In
          </Link>
        )}
      </Box>

      <Box className={classes.link}>
        <Link
          to="/posts"
          style={{ textDecoration: "inherit", color: "inherit" }}
        >
          Posts
        </Link>
      </Box>
    </Box>
  );
}

export default NavBar;
