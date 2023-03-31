import { Link as RLink } from 'react-router-dom';

import { useState, useRef } from "react";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import AppBar from "@mui/material/AppBar";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Notifications from '@mui/icons-material/Notifications';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import { pages } from '../data/constants';


export function AppNavBar(authenticated) {

  let auth = Boolean(authenticated);
  const [openMenu, setOpenMenu] = useState(false);
  const anchorOpenMenu = useRef(null);

  const handleMenuClick = () => {
    console.log('===== Clicked');
    setOpenMenu((prevState) => !prevState)
  };

  const handleMenuClose = () => {

  }

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ background: '#fff' }}>
        <Box>
          <AppBar>
            <Toolbar>
              <Grid container>
                <Grid item xs={3}>
                {/* <Grid item sx={{ display: 'flex', flexGrow: 1 }}> */}
                  <Typography ml={16} variant="h5">Z12</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Stack direction="row" ml={10}>
                  {pages.map((title) => (title === "Host Event") ? (
                    <MenuItem component={RLink} to="/createEvent" key={title}>
                      {title}
                    </MenuItem>
                  ) : (
                    <MenuItem key={title}>
                      <Typography>{title}</Typography>
                    </MenuItem>
                  ))}

                  </Stack>

                </Grid>
                <Grid item xs={2}>
                  <IconButton>
                    <Notifications />
                  </IconButton>
                  <Button component={RLink} to="/register" variant='text' color="secondary">Sign up</Button>
                  <Button py={3} component={RLink} to="/login" variant="contained" color='secondary'>Log In</Button>
                </Grid>
              </Grid>


              {/* <Popper>
                <MenuList>
                  <MenuItem to="/createEvent">Create new event</MenuItem>
                  <MenuItem>Manage events</MenuItem>
                </MenuList>
              </Popper> */}


              {/* {
          (auth)
          ? <Button component={RLink} to="/" variant='contained'>Logout</Button>
        } */}

            </Toolbar>
          </AppBar>
        </Box>
      </Container>
      <Toolbar />
    </>
  )
}

