import { useState, useEffect } from "react";
import { Link as RLink, useNavigate } from 'react-router-dom';

import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";

import { apiGetAndProcess, apiPostAndProcess } from "../utils/api";
import { ThemeProvider } from "@emotion/react";
import { themeOrange } from "../data/constants";

export default function LoginPage() {
  const [csrfToken, setCsrfToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const loadCsrfToken = () => {
    const tokenName = 'csrftoken='
    const indexCookie = document.cookie.indexOf(tokenName)
    if (indexCookie > -1) {
      console.log('csrftoken present');
      console.log(']]]] CSRF: ' + document.cookie.substring(indexCookie, document.cookie.indexOf(';', indexCookie)));
    } else {
      apiGetAndProcess('auth/getToken', {'credentials': 'include'}, setCsrfToken);
    }
  };
  const onLoginResponse = (data) => {
    console.log('==== Login reponse:' + data);
    setLoggedIn(true);
    navigate('/about');
  }

  function handleSubmission(e) {
    e.preventDefault();
    const details = new FormData(e.target);
    apiPostAndProcess('auth/login', {}, onLoginResponse, Object.fromEntries(details));
  }


  useEffect(() => {
    loadCsrfToken();
  }, []);

  return (
    <ThemeProvider theme={themeOrange}>

    <Container component="main" maxWidth="xs">
      <Box maxWidth='100%'>
        <Typography sx={{ my: 3 }} variant="h4">Sign In</Typography>
        <form onSubmit={handleSubmission}> {csrfToken['csrftoken']}
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                fullWidth={true}
                label="Email"
                name="email"
                type="email" />
            </Grid>
            <Grid item>
              <TextField
                fullWidth={true}
                margin="normal"
                label="Password"
                name="password"
                type="password" />

            </Grid>
            <Grid item>
              <Button color="primary" type="submit" variant="contained">Sign In</Button>
            </Grid>
          </Grid>
        </form>
      </Box>

    </Container>
    </ThemeProvider>

  );
}