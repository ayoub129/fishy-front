import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <Box mt={4}>
      <Link to="/customers" className="link">
        <ListItem button className="br-3">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
      </Link>
    </Box>
    <Box mt={4}>
      <Link to="/boats" className="link">
        <ListItem button className="br-3">
          <ListItemIcon>
            <DirectionsBoatIcon />
          </ListItemIcon>
          <ListItemText primary="Boats" />
        </ListItem>
      </Link>
    </Box>
    <Box mt={4}>
      <Link to="/users" className="link">
        <ListItem button className="br-3">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </Link>
    </Box>
    <Box mt={4}>
      <Link to="/sales" className="link">
        <ListItem button className="br-3">
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="sales" />
        </ListItem>
      </Link>
    </Box>
  </div>
);
