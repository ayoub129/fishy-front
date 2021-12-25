import {
  Grid,
  MenuItem,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import BoatsTable from "../componenet/BoatsTable";
import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Menu from "@material-ui//core/Menu";
import { mainListItems } from "../componenet/listItems";
import Footer from "../componenet/Footer";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link, useHistory } from "react-router-dom";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    zIndex: 3,
  },
  roo: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },

  appBar: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    zIndex: 4,
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    height: "100vh",
    overflow: "auto",
    position: "fixed",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  opening: {
    margin: "2.5em 1em 0px 0px ",
  },
}));

const Boats = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const opening = Boolean(anchorEl);

  const handleSalesExcel = () => {
    let fd = new FormData();
    fd.append("xlsx", excel);
    axios({
      method: "post",
      url: "https://fishys.000webhostapp.com/upload.php?table=boats",
      data: fd,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (response) {});
  };

  const [excel, setExcel] = useState("");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let history = useHistory();

  const logout = () => {
    sessionStorage.setItem("userData", "");
    sessionStorage.clear();
    history.push("/");
  };
  if (sessionStorage.getItem("loginData") == null) {
    history.push("/");
  }

  return (
    <Grid container justify="space-between">
      <Grid item md={2}>
        <div className={clsx(classes.root, classes.content)}>
          <CssBaseline />
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
          </Drawer>
        </div>
      </Grid>
      <Grid item lg={10} md={10} xs={11}>
        {/* header */}
        <div className={classes.roo}>
          <AppBar
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Fishy
              </Typography>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                className={classes.opening}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={opening}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/profile" className="link">
                    <Typography>Profile</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Typography onClick={logout}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          <Box mt={10} mx={4}>
            <Grid container alignItems="center">
              <Grid item>
                <p>upload Excel:</p>
              </Grid>
              <Grid item>
                <div class="image-upload">
                  <label for="file-input" style={{ cursor: "pointer" }}>
                    <CloudUploadIcon className="text-success"></CloudUploadIcon>
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    onChange={(e) => setExcel(e.target.files[0])}
                  />
                  {excel && <Button onClick={handleSalesExcel}>upload</Button>}
                </div>
              </Grid>
            </Grid>
            <BoatsTable></BoatsTable>
          </Box>
          <Footer />
        </div>
      </Grid>
    </Grid>
  );
};

export default Boats;
