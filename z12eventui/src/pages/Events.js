import { redirect, useNavigate } from 'react-router-dom';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { AppNavBar } from '../components/Home';
import { ThemeProvider } from '@emotion/react';
import { themeOrange } from '../data/constants';
import { useEffect, useState } from 'react';
import { apiGetAndProcess, apiPostAndProcess } from '../utils/api';

import { BasicEventReg, EventDetailsReg, FeesReg, ParticipantsReg } from '../components/Events';


import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import defaultTableHeadings from '../data/setup.json';



export function CreateEventBasic() {
  const [opened, setOpened] = useState(false);
  const [subMsg, setSubMsg] = useState([]);

  const [seriesList, setSeriesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  const [checkboxValues, setCheckboxValues] = useState([]);


  const [regStep, setRegStep] = useState(0);
  const [tableHeadings, setTableHeadings] = useState(defaultTableHeadings);
  const today = new Date(Date.now()).toISOString().substring(0, 16);

  const [formDetails, setFormDetails] = useState({
    title: 'Munster 2k U23s',
    series_type: 'Rowing',
    event_category: 'Regional',
    location: 'Shannon',
    country: 'Ireland',
    reg_start: today,
    reg_end: today,
    event_start: today,
    event_end: today,
    fees: {
      amount: 0,
      currency: 'EUR',
    },
    host_id: '',
    allowed_participants: {},
  });
  const [renderedTables, setRenderedTables] = useState([]);

  
  const seriesJson = () => {
    if (seriesList.length === 0) {
      apiGetAndProcess('events/series', {}, setSeriesList);
    }
  };
  const categoriesJson = () => {
    if (categoriesList.length === 0) {
      apiGetAndProcess('events/categories', {}, setCategoriesList);
    }
  };

  const renderRegStep = () => {
    switch (regStep) {
      case 0:
        return (<BasicEventReg series={seriesList} categories={categoriesList} formDetails={formDetails} setFormDetails={setFormDetails} />);
      case 1:
        console.log('send reg step');
        return (<EventDetailsReg formDetails={formDetails} setFormDetails={setFormDetails} />);
      case 2:
        return (<ParticipantsReg tableHeadings={tableHeadings} setTableHeadings={setTableHeadings} formDetails={formDetails} setFormDetails={setFormDetails}
          renTab={renderedTables} setRenTab={setRenderedTables} chbVals={checkboxValues} setChbVals={setCheckboxValues}/>);
      case 3:
        return (<FeesReg formDetails={formDetails} setFormDetails={setFormDetails} />);
      case 4:
        return;
      default:
        console.log('ERROR wrong registration flow');
    }
  };
  const handleProgression = (e) => {
    e.preventDefault();
    const details = new FormData(e.target);
    console.log('old:');
    console.log(formDetails)
    console.log('--- new details: ');
    console.log(details);
    setFormDetails({
      ...formDetails,
      ...details,
    });
    if (regStep < 3) {
      setRegStep(regStep + 1);
    } else {
      uploadEvent(formDetails);
    }

  };
  const runValidation = () => {
    const myform = document.querySelector('form');
    return myform.reportValidity();
  };
  const launchAlert = (result) => {
    setOpened(true);
    setSubMsg(result);
  };
  const [eventId, setEventId] = useState('');
  const uploadEvent = (data) => {
    console.log(data);
    apiPostAndProcess('events', {}, launchAlert, data);
  };

  seriesJson();
  categoriesJson();

  useEffect(() => { }, [opened]);
  const navigate = useNavigate();
  return (
    <>
      <ThemeProvider theme={themeOrange}>
        <AppNavBar />
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={7}>
            <Typography variant="h3" align="center" mt={5} mb={4}>Host a new event</Typography>
          </Grid>
        </Grid>
        <Grid container mb={5} spacing={2}>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <Paper>
              <MenuList>
                <MenuItem key={0} selected={regStep === 0} onClick={() => runValidation() && setRegStep(0)}>Basic Info</MenuItem>
                <MenuItem key={1} selected={regStep === 1} onClick={() => runValidation() && setRegStep(1)}>Event Details</MenuItem>
                <MenuItem key={2} selected={regStep === 2} onClick={() => runValidation() && setRegStep(2)}>Participants</MenuItem>
                <MenuItem key={3} selected={regStep === 3} onClick={() => runValidation() && setRegStep(3)}>Fees</MenuItem>
              </MenuList>
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <form onSubmit={handleProgression}>
              <Stack px={5} spacing={3}>
                {renderRegStep()}
                <Grid container mt={3}>
                  <Grid item xs={4} />
                  <Grid item xs={4}>
                  </Grid>
                </Grid>
              </Stack>
              <Container mt={10} maxWidth='xs'>
                <Button fullWidth variant='contained' color='primary' type="submit">Next</Button>
              </Container>
            </form>
          </Grid>
        </Grid>
        <Dialog open={opened} onClose={() => navigate("/events/1")}>
          <DialogTitle>{Object.keys(subMsg)[0]}</DialogTitle>
          <DialogContent>{subMsg[Object.keys(subMsg)[0]]}</DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => {
              setOpened(false);
              navigate('/home');
            }}>OK</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  )
}

export function FormAlert({data}) {
  const msgKey = Object.keys(data)[0];
  const [opened, setOpened] = useState(true);
  return (
    <Dialog open={opened} onClose={() => redirect("/events/1")}>
      <DialogTitle>{msgKey}</DialogTitle>
      <DialogContent>{data[msgKey]}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setOpened(false)}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

export function EventDetailPage({ eventId='6429cd5d2973e9d50aef0d6e' }) {
  const [viewStep, setViewStep] = useState(0);
  const [eventData, setEventData] = useState('');
  const getData = () => {
    apiGetAndProcess('events/' + eventId, {}, (j) => { console.log(j); setEventData(j) });
  }
  useEffect(() => {
    getData();
  }, [viewStep]);

  const unwrapParticipants = () => {
    if (eventData === '') {
      return [];
    }
    const toPrint = [];
    let ptr = eventData.allowed_participants;
    for ( ; !(ptr instanceof Array); ptr = Object.keys(ptr)[0] ) {
      console.log(...toPrint);
      toPrint.push(Object.keys(ptr));
    }
    toPrint.push(...ptr);
    return toPrint;
  };

  return (
    <ThemeProvider theme={themeOrange}>
      <AppNavBar />
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={7}>
          <Box height='sm' sx={{ backgroundImage: '\\img\\card_cover_1.png' }}></Box>
          <ImageList fullWidth>
            <ImageListItem fullWidth>
              <img fullWidth src='\img\card_cover_1.png' />
            </ImageListItem>
          </ImageList>
        </Grid>

      </Grid>
      <Grid container mb={5} spacing={2}>
        <Grid item xs={1} />
        <Grid item xs={2}>
          <Paper>
            <MenuList>
              <MenuItem key={0} selected={viewStep === 0}>Overview</MenuItem>
              <MenuItem key={1} selected={viewStep === 1}>Dependencies</MenuItem>
              <MenuItem key={2} selected={viewStep === 2}>Participants</MenuItem>
              <MenuItem key={3} selected={viewStep === 3}>Results</MenuItem>
              <MenuItem key={4} selected={viewStep === 4}>Fees</MenuItem>

            </MenuList>
          </Paper>

        </Grid>
        <Grid px={10} item xs={7}>
        <Typography bold variant='h3'>{eventData.title}</Typography>
          <Typography bold variant='h5'>Description</Typography>
          <Typography>{eventData.description}</Typography>
          <Typography bold variant='h5'>Categories</Typography>
          <Typography variant='subtitle-1'>
          {unwrapParticipants()}
          
          </Typography>


        </Grid>
      </Grid>
    </ThemeProvider>
  );
}