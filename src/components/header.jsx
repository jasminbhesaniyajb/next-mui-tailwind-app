'use client';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
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

  // Mock function to toggle login state (for demo purposes)
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const pages = ['Home', 'About'];
  const userMenuItems = [
    { title: 'Profile', href: '/profile' },
    { title: 'Change Password', href: '/change-password' },
    { title: 'Logout', href: '#', action: () => setIsLoggedIn(false) },
  ];

  return (
    <AppBar position="static" className="!bg-white text-black shadow-md">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="w-full">
          <Box className="mr-4 hidden md:flex">
            <Link href="/" passHref>
              <Box component="span" className="flex items-center cursor-pointer">
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              className="block md:hidden"
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link href={page === 'Home' ? '/' : `/${page.toLowerCase()}`} className="text-text-dark no-underline">
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
              {!isLoggedIn && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link href="/signin" className="text-text-dark no-underline">
                      Sign In
                    </Link>
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>

          <Box className="flex flex-grow justify-center md:hidden">
            <Link href="/" passHref>
              <Box component="span" className="flex items-center cursor-pointer">
                <Image 
                  src="/logo.png" 
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
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                className=" mx-2 block"
              >
                <Link 
                  href={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                  className="no-underline text-black font-medium hover:text-accent"
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>

          <Box className="flex items-center">
            {isLoggedIn ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} className="p-0 ml-4">
                    <Avatar alt="User" src="/user-avatar.png" className="w-10 h-10 bg-accent-light" />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {userMenuItems.map((item) => (
                    <MenuItem 
                      key={item.title} 
                      onClick={() => {
                        if (item.action) item.action();
                        handleCloseUserMenu();
                      }}
                      className="min-w-[160px]"
                    >
                      <Link href={item.href} className="text-text-dark no-underline w-full">
                        <Typography textAlign="center">{item.title}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button 
                variant="contained" 
                className="bg-accent text-white ml-4 hover:bg-accent-dark"
                onClick={toggleLogin}
              >
                <Link href="/signin" className="text-white no-underline">
                  Sign In
                </Link>
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;