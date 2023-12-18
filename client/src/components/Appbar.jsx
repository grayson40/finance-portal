import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MoneyIcon from "@mui/icons-material/Money";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";

export default function ButtonAppBar({ open, setOpen }) {
  const [anchor, setAnchor] = useState(null);

  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    handleClose();
  };

  const toggleDrawer = () => {
    // Add function to toggle drawer
    setOpen(!open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" style={{ backgroundColor: "#6734eb" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            {open ? <Close /> : <MenuIcon />}
          </IconButton>
          <MoneyIcon />
          <Typography
            variant="h6"
            component="div"
            style={{ marginLeft: "12px" }}
            sx={{ flexGrow: 1 }}
          >
            Finance Portal
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchor}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              open={Boolean(anchor)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/profile" onClick={handleClose}>
                My Account
              </MenuItem>
              <MenuItem component={Link} to="/login" onClick={handleSignOut}>
                Sign Out
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
