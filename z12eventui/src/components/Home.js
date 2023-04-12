import { Link as RLink } from 'react-router-dom';

import { useState, useRef } from "react";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import AppBar from "@mui/material/AppBar";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Notifications from '@mui/icons-material/Notifications';
import Grid from '@mui/material/Grid';

import Stack from '@mui/material/Stack';
import { PAGES } from '../data/constants';


export function AppNavBar(authenticated) {

  let auth = Boolean(authenticated);
  const [openMenu, setOpenMenu] = useState(false);
  const anchorOpenMenu = useRef(null);
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ background: '#fff' }}>
        <Box>
          <AppBar>
            <Toolbar>
              <Grid container>
                <Grid item sx={{ display: 'flex', flexGrow: 1 }}>
                {/* <Grid item sx={{ display: 'flex', flexGrow: 1 }}> */}
                  <Typography ml={10} variant="h5">Z12</Typography>
                </Grid>
                <Grid item sx={{ display: 'flex', flexGrow: 1 }}>
                  <Stack direction="row">
                  {PAGES.map((title) => (<MenuItem component={RLink} to={title[1]} key={title[0]}>{title[0]}</MenuItem>))}
                  </Stack>

                </Grid>
                <Grid item ml={2} xs={2}>
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

