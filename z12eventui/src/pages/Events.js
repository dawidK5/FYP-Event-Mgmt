import { redirect } from 'react-router-dom';



import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { AppNavBar } from '../components/Home';
import { ThemeProvider } from '@emotion/react';
import { themeOrange, COUNTRIES } from '../data/constants';
import { useEffect, useState, useRef, createContext } from 'react';
import { apiGetAndProcess, apiPostAndProcess } from '../utils/api';

// import { GoogleMapReact, Marker } from 'google-map-react';
import GoogleMap from 'google-maps-react-markers';
import { BasicEventReg, EventDetailsReg, FeesReg, ParticipantsReg } from '../components/Events';


import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import defaultTableHeadings from '../data/setup.json';



export function CreateEventBasic() {
  const [seriesList, setSeriesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  const [checkboxValues, setCheckboxValues] = useState([]);


  const [formAlert, setFormAlert] = useState([]);
  const [regStep, setRegStep] = useState(0);
  const [tableHeadings, setTableHeadings] = useState(defaultTableHeadings);
  const [formDetails, setFormDetails] = useState({
    title: 'Munster 2k',
    series_type: '',
    event_category: '',
    location: 'Shannon',
    country: 'Ireland',
    reg_start: '',
    reg_end: '',
    event_start: '',
    event_end: '',
    fees: {
      amount: 0,
      currency: '',
    },
    allowed_participants: {},
  });
  const [renderedTables, setRenderedTables] = useState([]);
  const [participantsReg, setParticipantsReg] = useState([]);

  
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
      ...Object.fromEntries(Object.entries(formDetails)),
      ...Object.fromEntries(details)
    });
    if (regStep < 3) {
      setRegStep(regStep + 1);
    } else {
      uploadEvent(formDetails)
    }

  };
  const runValidation = () => {
    const myform = document.querySelector('form');
    return myform.reportValidity();
  };
  const uploadEvent = (data) => {
    console.log(data);
    apiPostAndProcess('events', {}, (result) => setFormAlert(<FormAlert data={result} />), data);
  };

  seriesJson();
  categoriesJson();
  // headingsJson();

  // useEffect(() => { }, [regStep]);

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
        {formAlert}
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
        <Button autofocus onClick={() => setOpened(false)}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

export function EventDetailPage() {
  const [viewStep, setViewStep] = useState(0);
  const [eventData, setEventData] = useState({});
  useEffect(() => {
    apiGetAndProcess('events/1', {}, setEventData)

  }, [viewStep]);

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

          <Typography bold variant='h5'>Description</Typography>
          <Typography>{eventData.description}</Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}