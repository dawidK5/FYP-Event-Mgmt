import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { ThemeProvider } from '@mui/material/styles';

import { themeOrange } from '../data/constants.js';
import { BasicRegistrationInputs, AthleteCoachInputs } from '../components/Registration.js';
import { apiGetAndProcess, apiPostAndProcess } from '../utils/api.js';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';



export function RegisterFirstPage() {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [subMsg, setSubMsg] = useState([]);
  const [clubsList, setClubsList] = useState([]);
  const onAlertClosed = () => {
    setOpened(false)
    navigate('/about');
  };

  const launchAlert = (result) => {
    setOpened(true);
    if (!result.isMinor) {
      setSubMsg({'Success': 'Registration successful!'});

    } else {
      setSubMsg({'Error': 'Registration failed: user already exists'});
    }
  };

  const clubsJson = () => {
    if (clubsList.length === 0) {
      apiGetAndProcess('clubs', {}, setClubsList);
    }
  };
  const handleRegistrationData = (e) => {
    e.preventDefault();
    const details = new FormData(e.target);
    apiPostAndProcess('users', {}, launchAlert, Object.fromEntries(details));
  };
  
  useEffect(() => {
    document.title = "Z12 Events Manager - Register I";
    clubsJson();
  }, []);

  return (
    <ThemeProvider theme={themeOrange}>

    <Container component="main" maxWidth="sm">
      <Typography variant="h3" sx={{ my: 3 }}>Register for an account</Typography>
      <Stack component="form" onSubmit={handleRegistrationData} spacing={2} mb={3}>
        { (clubsList.length > 0) ? (<BasicRegistrationInputs clubsList={clubsList} />) : null }
       
        <Button variant='contained' color='primary' type='submit'>Register</Button>
      </Stack>
      
    </Container>
    <Dialog open={opened} onClose={() => navigate("/about")}>
          <DialogTitle>{Object.keys(subMsg)[0]}</DialogTitle>
          <DialogContent>{subMsg[Object.keys(subMsg)[0]]}</DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => onAlertClosed()}>OK</Button>
          </DialogActions>
        </Dialog>
    </ThemeProvider>
  );
}

export function RegisterSecondPage() {
  const [clubsList, setClubsList] = useState([]);
  const clubsJson = () => apiGetAndProcess('clubs', {}, setClubsList);

  const decideNextPage = () => {
    console.log('');
  }
  const handleRegistrationData = (e) => {
    e.preventDefault();
    const details = new FormData(e.target);
    apiPostAndProcess('users', {}, decideNextPage, Object.fromEntries(details));
  };

  useEffect(() => {
    document.title = "Z12 Events Manager - Register II";
    clubsJson();
  }, []);
  
  return (
    <ThemeProvider theme={themeOrange}>
      <Container spacing={3} maxWidth="sm" mb={3}>
        <Alert severity="error" mb={3}>
          <AlertTitle>Note</AlertTitle>
          You were discovered to be minor. In order to register, you <b>must</b> have your parent/guardian's permission.
          Please ask them to fill in their registration details below.
        </Alert>
        <Stack component="form" onSubmit={handleRegistrationData} spacing={2} mb={3}>
          <BasicRegistrationInputs clubs={clubsList} />
          <AthleteCoachInputs />
          <Grid container mb={3}>
            <Grid item xs={1}>
              <Button color="error" variant="contained">Back</Button>
            </Grid>
            <Grid item xs={8} />
            <Grid item xs={1}>
              <Button variant="contained" color="primary">Finish registration</Button>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}