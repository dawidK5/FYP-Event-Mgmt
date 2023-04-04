import { useEffect, useState } from 'react';


import { ThemeProvider } from '@emotion/react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


import {apiGetAndProcess} from '../utils/api.js';
import {themeOrange} from '../data/constants.js';
import {AppNavBar} from '../components/Home';
import {EventCard} from '../components/Events';


export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [eventCards, setEventCards] = useState([]);
  const eventsJson = () => apiGetAndProcess('events', null, setEventCards);

  useEffect(() => {
    document.title = "Z12 Events Manager - All Events";
    eventsJson();

  }, []);

  return (
    <>
      <ThemeProvider theme={themeOrange}>
        <AppNavBar />
        <Container>
          <Typography variant='h4' align='center'>All Events</Typography>
          <Grid container spacing={3}>
            {/* {eventCards.map((eventData, ind) => {
              console.log('===== Event Data: ' + eventData);
              return <EventCard data={eventData} key={ind} />
            })} */}
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}