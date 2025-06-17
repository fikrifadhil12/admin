// src/components/Sidebar.js
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Sidebar = () => (
  <Box
    sx={{
      width: 250,
      height: "100vh",
      bgcolor: "background.paper",
      boxShadow: 3,
      p: 2,
    }}
  >
    <Typography variant="h6" sx={{ p: 2, fontWeight: "bold" }}>
      Admin Panel
    </Typography>
    <List>
      <ListItem button component={Link} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/orders">
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Pesanan" />
      </ListItem>
      <ListItem button component={Link} to="/users">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Pengguna" />
      </ListItem>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  </Box>
);

export default Sidebar;
