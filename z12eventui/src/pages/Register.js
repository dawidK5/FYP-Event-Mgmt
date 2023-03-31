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

function decideNextPage(resp) {
    if (resp.isMinor) {
      console.log(resp);
      redirect("/registerMinor");
    } else {
      console.log('---- Registration successful');
      redirect("/home");
    }
  }

export function RegisterFirstPage() {
  const [clubsList, setClubsList] = useState([]);
  // const handleClubs = (data) => {
  //   setClubsList(data);
  //   console.log('-- Updating inputs select')

  // }
  const clubsJson = () => {
    apiGetAndProcess('clubs', {}, setClubsList);
    
  }
  const handleRegistrationData = (e) => {
    e.preventDefault();
    const details = new FormData(e.target);
    apiPostAndProcess('users', {}, decideNextPage, Object.fromEntries(details));
  };
  
  useEffect(() => {
    document.title = "Z12 Events Manager - Register I";
    clubsJson();
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h3" sx={{ my: 3 }}>Register for an account</Typography>
      <Stack component="form" onSubmit={handleRegistrationData} spacing={2}>
        { (clubsList.length > 0) ? (<BasicRegistrationInputs clubsList={clubsList} />) : null }
       
        <Button variant='contained' color='primary' type='submit'>Register</Button>
      </Stack>
      
    </Container>
  );
}

export function RegisterSecondPage() {
  const [clubsList, setClubsList] = useState([]);
  const clubsJson = () => apiGetAndProcess('clubs', {}, setClubsList);

  const handleRegistrationData = (e) => {
    e.preventDefault();
    const details = new FormData(e.target);
    apiPostAndProcess('users', {}, decideNextPage, Object.fromEntries(details));
  }
  
  function decideNextPage() {

  }
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
        <Stack component="form" onSubmit={handleRegistrationData} spacing={2}>
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