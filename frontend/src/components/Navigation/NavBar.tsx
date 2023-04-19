import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Stack,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import travAlly from "../../assets/TravAlly.png";
import { authActions } from "../../store/auth-slice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import { useLogoutUserMutation } from "../../store/api/authentication-api-slice";
import { useQuery } from "react-query";
import { useUserDetailQuery } from "../../store/api/authorization-api-slice";

const authenticatedPages = ["List your Property", "Support"];
const unauthenticatedPages = [
  "List your Property",
  "Support",
  "Login",
  "Register",
];

enum Page {
  Home = "/",
  "List your Property" = "/add-property",
  Support = "support",
  Login = "/login",
  Register = "/register",
}
// enum which associates each page with their path

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const [logout, { isSuccess }] = useLogoutUserMutation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openMenu = Boolean(anchorEl);
  const userId = useAppSelector((state) => state.auth.user?.user_id);
  console.log(userId);

  const { data, isLoading, isError } = useUserDetailQuery(userId!, {
    skip: !userId,
  });
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // state to control the menu

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const nav = useNavigate();

  type pageStrings = keyof typeof Page;
  const pagesToRender = user ? authenticatedPages : unauthenticatedPages;

  const logoutHandler = async () => {
    console.log("logout");
    await logout();
    dispatch(authActions.logOut());

    nav(Page.Home, { state: { openOnLogout: true }, replace: true });
  };

  const ProfileBox = styled(Box)(({ theme }) => ({
    // display: "flex",
    // alignItems: "center",
    // height: "100%",
    // width: "100%",
    //
  }));

  const navigationItems = (
    <Stack
      direction="row"
      spacing={{ sm: 1, md: 2 }}
      sx={{
        display: { xs: "none", sm: "flex" },
        alignItems: "center",
      }}
    >
      {pagesToRender.map((page) => (
        <Button
          to={`${Page[page as pageStrings]}`}
          key={page}
          variant="text"
          component={NavLink}
          sx={{
            opacity: 0.8,
            "&.active": {
              color: theme.palette.primary.dark,
              fontWeight: 900,
              opacity: 1,
            },
          }}
        >
          {page}
        </Button>
      ))}

      {user && (
        <Box>
          <Button
            id="profile-button"
            onClick={handleClick}
            aria-haspopup="true"
            aria-expanded={openMenu ? true : false}
            variant="text"
            sx={{
              "&.active": {
                color: theme.palette.primary.dark,
                fontWeight: 900,
              },
            }}
          >
            <Avatar
              src={data?.image ? data.image : ""}
              sx={{ mr: 1, width: 50, height: 50 }}
            />
            {data && `${data.first_name} ${data.last_name} `}
          </Button>
        </Box>
      )}
    </Stack>
  );

  const mobileNavigationDrawer = (
    <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
      <List>
        {pagesToRender.map((page) => (
          <ListItem
            to={`${Page[page as pageStrings]}`}
            key={page}
            component={NavLink}
          >
            {page}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  const StyledMenuIcon = styled(MenuIcon)({
    color: theme.palette.primary.main,
  });

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white" }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: {
            xs: "space-between",
            md: "space-around",
          },
        }}
      >
        <Stack direction="row" alignItems="center">
          <Box
            component={Link}
            sx={{
              background: `url(${travAlly})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: { sm: 140, md: 170, lg: 200 },
              height: 75,
            }}
            to={Page.Home}
            width={{ sm: 140, md: 170, lg: 200 }}
            height={70}
          />
        </Stack>
        {navigationItems}

        <Stack
          direction="row"
          spacing={2}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <StyledMenuIcon
            sx={{ width: 30, height: 30 }}
            onClick={() => setOpen(true)}
          />

          {mobileNavigationDrawer}
        </Stack>
        {user && (
          <Menu
            anchorEl={anchorEl}
            id="profile-menu"
            open={openMenu}
            onClick={handleClose}
            MenuListProps={{
              "aria-labelledby": "profile-button",
            }}
            onClose={handleClose}
            aria-haspopup="true"
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgColor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem component={Link} to="/profile">
              <Avatar /> Profile
            </MenuItem>
            <MenuItem>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={logoutHandler}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
