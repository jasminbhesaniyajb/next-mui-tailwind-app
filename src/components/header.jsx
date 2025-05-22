"use client";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import Image from "next/image";
import { clearLoggedInUser, getLoggedInUser } from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@mui/material";

const HEADER_MENU = [
  { title: "Products", href: "/products" },
  // { title: "About", href: "/about" },
];

const USER_PROFILE_MENU = [
  { title: "Profile", href: "/profile" },
  { title: "Change Password", href: "/change-password" },
  { title: "Logout", href: "#" },
];

const Header = () => {
  const pathname = usePathname();
  const user = getLoggedInUser();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    clearLoggedInUser();
    router.push("/login");
  };

  return (
    <AppBar position="static" className="!bg-white text-black shadow-md">
      <Container>
        <Toolbar disableGutters className="w-full">
          <Box className="mr-4 hidden md:flex">
            <Link href="/products">
              <Box
                component="span"
                className="flex items-center cursor-pointer"
              >
                <Image
                  src="/next.svg"
                  alt="Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                  priority
                />
              </Box>
            </Link>
          </Box>

          {/* Mobile view */}
          <Box className="flex md:hidden">
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              className=""
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              className="md:hidden flex gap-4 !w-full"
              sx={{
                "& .MuiMenu-paper": {
                  width: "100%",
                  maxWidth: "100%",
                  left: "0 !important",
                  right: "0 !important",
                },
              }}
            >
              {HEADER_MENU.map((item, index) => (
                <MenuItem
                  className="w-full"
                  key={index}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">
                    <Link
                      href={item.href}
                      className={`no-underline font-medium transition-colors duration-200 px-2 py-1 rounded-md
              ${
                pathname === item.href
                  ? "text-accent font-semibold"
                  : "text-gray-700"
              }
              hover:text-accent hover:bg-gray-100`}
                    >
                      {item.title}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box className="flex flex-grow justify-center md:hidden">
            <Link href="/" passHref>
              <Box
                component="span"
                className="flex items-center cursor-pointer"
              >
                <Image
                  src="/next.svg"
                  alt="Logo"
                  width={100}
                  height={35}
                  className="object-contain"
                  priority
                />
              </Box>
            </Link>
          </Box>

          <Box className="hidden md:flex md:flex-grow">
            <ul className="flex gap-4 list-none ml-4">
              {HEADER_MENU.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`no-underline font-medium py-1 
              ${
                pathname === item.href
                  ? "text-blue-500 border-b border-blue-500"
                  : "text-black"
              } 
              hover:text-blue-600`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>

          <Box className="flex items-center">
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} className="p-0 ml-4">
                    <Avatar
                      alt="User"
                      src=""
                      className="w-10 h-10"
                    >
                      {user?.firstName?.[0]?.toUpperCase() || ""}
                      {user?.lastName?.[0]?.toUpperCase() || ""}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {USER_PROFILE_MENU.map((item) => (
                    <MenuItem
                      key={item.title}
                      onClick={(e) => {
                        handleCloseUserMenu();
                        if (item.title === "Logout") {
                          handleLogout();
                        } else {
                          router.push(item.href);
                        }
                      }}
                    >
                      <Typography>{item.title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
                <h3 className="text-black font-semibold">
                  {user?.firstName} {user?.lastName}
                </h3>
              </>
            ) : (
              <Button variant="contained" onClick={() => router.push("/login")}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
