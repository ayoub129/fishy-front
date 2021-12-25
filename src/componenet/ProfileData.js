import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    width: 90,
    height: 90,
  },
}));

export default function ProfileData() {
  const api = axios.create({
    baseURL: `http://localhost/fish/api2/`,
  });

  const user = JSON.parse(sessionStorage.getItem("loginData"));

  const [data, setData] = useState({});
  const handleUpdate = () => {
    const id = user.id;
    // update the data using patch
    api
      .patch("/users.php?type=usersUpdate" + id, data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="Information" {...a11yProps(0)} />
        {/* <Tab label="Change information" {...a11yProps(1)} /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <List>
          <Grid container alignItems="center">
            <Grid item md={1}>
              <ListItemAvatar>
                <Avatar alt="" src="" className={classes.avatar} />
              </ListItemAvatar>
            </Grid>
            <Grid item>
              <ListItem>
                <ListItemText primary={`name : ${user.data.firstName}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`email : ${user.data.email}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`access : ${user.data.isAdmin}`} />
              </ListItem>
            </Grid>
          </Grid>
        </List>
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
      <form className={classes.form} onSubmit={handleUpdate} noValidate>
          <Grid container>
              <Grid item md={3}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="Firstname"
                label=" Firstname "
                name="Firstname"
                autoComplete="Firstname"
                autoFocus  
               type="text"
                placeholder='edit Firstname'
                value={data.firstname}
                onChange={(e) => {setData({...data , firstname:e.target.value})}}
              />
              </Grid>
              <Grid item md={5}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                name="Lastname"
                label="Lastname"
                type="text"
                id="Lastname"
                placeholder='edit Lirstname'
                value={data.lastname}
                onChange={(e) => {setData({...data , lastname:e.target.value})}}
              />
             </Grid>
          </Grid>
          <Grid container>
              <Grid item md={3}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="email"
                label="Email "
                type='email'
                name="email"
                autoComplete="email"
                autoFocus
                placeholder='edit email'
                value={data.email}
                onChange={(e) => {setData({...data , email:e.target.value})}}
              />
              </Grid>
              <Grid item md={5}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={data.password}
                onChange={(e) => {setData({...data , password:e.target.value})}}
              />
             </Grid>
          </Grid>

         <Button variant='contained' type='submit' color='primary'>Update</Button>
          </form>
      </TabPanel>
     */}
    </div>
  );
}
