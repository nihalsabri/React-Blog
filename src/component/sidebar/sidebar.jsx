import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        height: "100vh",
        padding: 2,
      }}
    >
      {/* Sidebar Title */}
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Dashboard
      </Typography>

      {/* Sidebar List */}
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="../../dashboard/posts">
            <ListItemText primary="Posts" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="../dashboard/categories">
            <ListItemText primary="Categories" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="../../dashboard/users">
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;