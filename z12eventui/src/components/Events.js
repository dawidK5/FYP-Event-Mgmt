import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { COUNTRIES } from '../data/constants';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Camera from '@mui/icons-material/Camera';
import { Alert, Checkbox, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { AddCircleOutline } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { useFetcher } from 'react-router-dom';


export function EventCard(data) {
  return (
    <Grid item xs={8}>
      <Card variant="outlined">
        <CardMedia
          image={data.cover_path} loading="lazy" />
        <CardContent>
          <Typography variant='h2'>{data.event_title}</Typography>
          <Typography variant='body1'>{data.venue_name}, {data.country}</Typography>
          <Typography variant='body1'>{data.event_dates}</Typography>
          {/* <Divider orientation="vertical" /> */}
          {/* <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          1 hour ago
        </Typography> */}
        </CardContent>
      </Card>
    </Grid>
  );
}

export function BasicEventReg({ series, categories, formDetails, setFormDetails }) {
  // const [selectCat, setSelectCat] = useState(categories[0]);
  const today = new Date(Date.now()).toISOString().substring(0, 16);
  // let s = 1;
  // useEffect(() => {
  //   setTimeout(1000);
  // },[selectCat]);
  return (
    <>
      <TextField name="title" label="Title" required validate="true" defaultValue={formDetails.title}
        onChange={(e) => setFormDetails({ ...formDetails, title: e.target.value })} >
      </TextField>
      {/* <TextField name="group_type" type="hidden" value="Individual" /> */}

      <TextField name="event_category" select label="Event category" defaultValue={formDetails.event_category}
        onChange={(e) => setFormDetails({ ...formDetails, event_category: e.target.value })} required SelectProps={{ multiple: false }} validate="true">
        {/* {(categories[0]) ? setSelectCat(categories[0]) : null} */}
        {categories.map((entry, ind) => <MenuItem key={ind} value={entry}>{entry}</MenuItem>)}
      </TextField>


      <TextField name="series_type" select label="Series type" required SelectProps={{ multiple: false }} validate="true"
        defaultValue={formDetails.series_type}
        onChange={(e) => setFormDetails({ ...formDetails, series_type: e.target.value })}>
        {series.map((entry, ind) => <MenuItem key={ind} value={entry}>{entry}</MenuItem>)}
      </TextField>

      <TextField name="location" label="Venue Location" required validate="true" defaultValue={formDetails.location} onChange={(e) => setFormDetails({ ...formDetails, location: e.target.value })}></TextField>

      <TextField name="country" select label='Please select country' defaultValue={formDetails.country} SelectProps={{ multiple: false }} required={true} validate="true"
        onChange={(e) => setFormDetails({ ...formDetails, country: e.target.value })}>
        {
          (COUNTRIES.length > 0) ? (COUNTRIES.map((country, id) => (
            <MenuItem key={id} value={country}>{country}</MenuItem>
          ))) : null
        }
      </TextField>
      {/* <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMap
        apiKey="AIzaSyDLIF49WyMiXhyK7hBtqviikkuuY3Cm5HE"
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultZoom={20}
        // options={mapOptions}
        mapMinHeight="100vh"
        onGoogleApiLoaded={onGoogleApiLoaded}
        onChange={(map) => console.log('Map moved', map)}
      >
        <div className="marker" key={0} position={{ lat: latitude, lng: longitude }} lat={latitude} lng={longitude} markerId={'venuelocation'} onClick={onMarkerClick} />
      </GoogleMap>

    </div> */}
      {
        // AIzaSyBDEuHvYmYbSum8cIZEHsK8bBhlD0bO0xw
        // AIzaSyB6LvQ_RQNk9SazNYNJun-gBaPwJKM6Baw
      }

      <Grid container rowSpacing={3}>
        <Grid item xs={5}>
          <TextField fullWidth name="reg_start" type="datetime-local" defaultValue={formDetails.reg_start || today} label="Registration Opens" required={true} validate="true"
            onChange={(e) => setFormDetails({ ...formDetails, reg_start: e.target.value })}></TextField>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={5}>
          <TextField fullWidth name="reg_end" type="datetime-local" defaultValue={formDetails.reg_end || today} label="Registration Closes" required validate="true"
            onChange={(e) => setFormDetails({ ...formDetails, reg_end: e.target.value })}></TextField>
        </Grid>
        <Grid item xs={5}>
          <TextField fullWidth name="event_start" type="datetime-local" defaultValue={formDetails.event_start || today} label="Event Start Time" required={true} validate="true"
            onChange={(e) => setFormDetails({ ...formDetails, event_start: e.target.value })}></TextField>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={5}>
          <TextField fullWidth name="event_end" type="datetime-local" defaultValue={formDetails.event_end || today} label="Event Finish Time" required={true} validate="true"
            onChange={(e) => setFormDetails({ ...formDetails, event_end: e.target.value })}></TextField>
        </Grid>
      </Grid>
    </>
  );
}

export function EventDetailsReg({ formDetails, setFormDetails }) {
  return (
    <>
      <TextField name="description" label="Description" minRows={2} defaultValue={formDetails.description} onChange={(e) => setFormDetails({ ...formDetails, description: e.target.value })} validate="true" multiline required></TextField>
      {/* <Input name="imagename" accepts="image/jpeg, image/png" type="file" validate></Input> */}
      {/* <Button component="input" variant="contained" endIcon={<Camera />}>Upload photo</Button> */}
    </>
  );
}

export function AgeGroupTable({ tableDetails, formDetails, setFormDetails, renTab, setRenTab, chbVals, setChbVals }) {
  // Same for the entire table
  const gender = tableDetails.gender;
  const distance = tableDetails.distance;
  const numWeights = tableDetails.weight_categories.length;
  const numBoats = tableDetails.boat_classes.length;
  const numColsPerRow = tableDetails.boat_classes.length * tableDetails.weight_categories.length;
  const numColsTotal = numColsPerRow * tableDetails.age_categories.length;

  console.log("7688");
  console.log(chbVals);
  // useEffect(() => {
  //   console.log('in AgeGrou: participants changed');
  // }, [formDetails]);
  
  const onCheckboxClicked = (e, checkboxIndex) => {
    // update form allowed participants

    // apply participants to checkbox values

    // update state in checkboxValues
  };
  const appendToForm = (e, checkboxInd) => {
    // e.target.checked = true;
  
    const row = (checkboxInd / numColsPerRow) | 0;
    const relIndex = checkboxInd - (row * numColsPerRow);

    const age = tableDetails.age_categories[row];
    const boat_num = ((relIndex) / numWeights) | 0;
    const boat_class = tableDetails.boat_classes[boat_num];
    const weight = tableDetails.weight_categories[relIndex % numWeights];
    console.log('=====' + age + boat_class + weight);

    
    const tree = [gender, distance, age, boat_class, weight];
    let ptr = { ...formDetails.allowed_participants };
    let jbr = ptr;
    for (let i = 0; i < tree.length - 2; i++) {
      if (!(ptr[tree[i]])) {
        ptr[tree[i]] = {};
      }

      ptr = ptr[tree[i]];
    }
    if (!jbr[gender][distance][age][boat_class]) {
      ptr[tree[tree.length - 2]] = [];

    }
    if (e.target.checked) {
      ptr[tree[tree.length - 2]].push(tree[tree.length - 1]);

    } else {
      jbr[gender][distance][age][boat_class] = jbr[gender][distance][age][boat_class].filter(item => item !== tree[tree.length - 1]);

    }
    console.log(JSON.stringify(jbr));

    setFormDetails({ ...formDetails, allowed_participants: { ...jbr } });
    const checkboxesCopy = [...chbVals]
    console.log("ticked: ", e.target.checked)
    checkboxesCopy[checkboxInd] = e.target.checked;
    setChbVals(checkboxesCopy);
    console.log(checkboxesCopy);
  };


  // checked={formDetails.allowed_participants[gender][distance][rowNum][(relIndex/numBoats) | 0][(relIndex%numBoats)] == true}
  const makeRow = (rowNum, i, even) => {
    const maxIndex = i + numColsPerRow;
    let checkboxRow = [];
    for (let j = i; j < maxIndex; j++) {
      const relIndex = maxIndex - j;
      if (even) {
        checkboxRow.push(
          <TableCell align='center' sx={{ background: '#f6f6f6' }} key={'tc'.concat(String(j))} padding='checkbox'>
            <Checkbox key={'cb'.concat(String(j))} checked={chbVals[j]} onChange={(e) => appendToForm(e, j)} />
          </TableCell>
        );
      } else {
        checkboxRow.push(
          <TableCell align='center' sx={{ background: '#fce1b3' }} key={'tc'.concat(String(j))} padding='checkbox'>
            <Checkbox key={'cb'.concat(String(j))} checked={chbVals[j]} onChange={(e) => appendToForm(e, j)} />
          </TableCell>
        );
      }
    }
    return checkboxRow;
  };
  const getRowsWithCheckboxes = () => {
    let allRows = [];
    tableDetails['age_categories'].map((agecat, mykey) => {
      allRows.push(<TableRow key={'rww' + mykey}>
        <TableCell width={1} sx={{ 'background': 'orange', 'fontweight': 'bold', 'maxWidth': '30%' }} key={'ac'.concat(String(mykey))}>{agecat}</TableCell>
        {makeRow(mykey, mykey * numColsPerRow, mykey % 2 === 0,)}
      </TableRow>);
    });
    return allRows;
  };



  return (
    <Box mb={5}>
      <Paper>
        <Typography pt={2} mt={3} mb={1} variant='h4' align='center'>{tableDetails.table_name} - {tableDetails.distance}</Typography>
        <TableContainer>

          <Table>
            <TableHead>
              {/* <TableRow key='rw0'>
              <th key='acb'></th>
              <th key='bc' colSpan={12}>Boat Classes</th>
            </TableRow> */}
              <TableRow key='rw1'>
                <TableCell sx={{ 'background': '#f6f6f6', 'fontWeight': 'bold' }} key='ac' rowSpan={2}>Categories</TableCell>
                {/* <TableCell key='acc'></TableCell> */}
                {tableDetails['boat_classes'].map((tero, ind) => <TableCell align='center' sx={(ind % 2) ? { 'background': 'orange', 'fontWeight': 'bold' } : { 'background': '#f6f6f6', 'fontWeight': 'bold' }} key={'bc'.concat(String(ind))} colSpan={numWeights}>{tero}</TableCell>)}
              </TableRow>
              <TableRow key='rw4'>

                {tableDetails['weight_categories'].map((tero, ind) => <TableCell align='center' sx={{ 'background': 'orange', 'fontWeight': 'bold' }} key={'wc'.concat(String(ind))}>{tero}</TableCell>)}
                {tableDetails['weight_categories'].map((tero, ind) => <TableCell align='center' sx={{ 'background': '#f6f6f6', 'fontWeight': 'bold' }} key={'wcc'.concat(String(ind))}>{tero}</TableCell>)}
                {tableDetails['weight_categories'].map((tero, ind) => <TableCell align='center' sx={{ 'background': 'orange', 'fontWeight': 'bold' }} key={'wccc'.concat(String(ind))}>{tero}</TableCell>)}
                {tableDetails['weight_categories'].map((tero, ind) => <TableCell align='center' sx={{ 'background': '#f6f6f6', 'fontWeight': 'bold' }} key={'wccccc'.concat(String(ind))}>{tero}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {getRowsWithCheckboxes()}
            </TableBody>
          </Table >
        </TableContainer>
      </Paper>
    </Box>
  );
}



export function FeesReg({ formDetails, setFormDetails }) {
  const CURRENCIES = ['USD', 'GBP', 'EUR', 'CAD'];
  return (
    <Grid container>
      <Grid item xs={6}>
        <TextField fullWidth type="number" name="fees.amount" min={0} label="Fee to be paid per team" defaultValue={formDetails.fees.amount} onChange={(e) => setFormDetails({ ...formDetails, fees: { ...formDetails.fees, amount: e.target.value } })} required validate></TextField>

      </Grid>
      <Grid item xs={2} />
      <Grid item xs={4}>

        <TextField fullWidth name="fees.currency" select label='Please select currency' defaultValue={formDetails.fees.currency} onChange={(e) => setFormDetails({ ...formDetails, fees: { ...formDetails.fees, currency: e.target.value } })} SelectProps={{ multiple: false }} required validate>
          {
            (CURRENCIES.length > 0) ? (CURRENCIES.map((country, id) => (
              <MenuItem key={id} value={country}>{country}</MenuItem>
            ))) : null
          }
        </TextField>
        
        <TextField sx={{display: 'none'}} type="hidden" hidden="true" name="host_id" value="63ff8250ae0ad7639b9c6b48"></TextField>

      </Grid>
    </Grid>
  );
}

export function ParticipantsReg({ tableHeadings, setTableHeadings, formDetails, setFormDetails, renTab, setRenTab, chbVals, setChbVals }) {
  
  const [alerts, setAlerts] = useState([]);
  const [distances, setDistances] = useState(['2000m', '6000m']);
  const [ages, setAges] = useState([...new Set(tableHeadings.map((v) => v.table_name))]);
  const [tableId, setTableId] = useState(0);
  const [toRender, setToRender] = useState({gender: 'M', distance: distances[0], age: ages[0]});

  const updateCheckboxes = () => {
    const emptyArr = Array.from({length: 150}, _ => false);
    setChbVals(chbVals => {
      console.log('bef tab gen: ');
      console.log(chbVals);
      const changedVals = [...emptyArr];
      return changedVals;
    });
  };
  const updateTables = (toPass) => {
    setRenTab(renTab => {
      console.log('when tab gen: ');
      console.log(chbVals);
      const changedVals = [...renTab, <AgeGroupTable key={"agt" + tableId}
      tableDetails={tableHeadings[toPass]}
      formDetails={formDetails} setFormDetails={setFormDetails} chbVals={chbVals} setChbVals={setChbVals}/>];
      console.log(changedVals);
      return changedVals;
    });
  };
  const generateTable = (toPass) => {
    updateCheckboxes();
    updateTables(toPass);
  };
  const noTables = () => {
    if (renTab.length < 1 || formDetails.allowed_participants === {}) {
      setAlerts(<Alert severity='error'>Please add at least one participant category</Alert>);
    }
  };
  const handleAddClicked = () => {
    const toPass = tableHeadings.findIndex(entry => entry.gender === toRender.gender && entry.table_name === toRender.age && entry.distance === toRender.distance);
    if (toPass === -1) {
      setAlerts(<Alert severity='error'>This table has already been added above</Alert>);
      return;
    }
    setTableId(tableId+1);
    generateTable(toPass);
    const headingsLessAdded = tableHeadings.filter(entry => !(entry.gender === toRender.gender && entry.table_name === toRender.age && entry.distance === toRender.distance));
    console.log('zzzzzzz');
    console.log(headingsLessAdded);
    setTableHeadings(headingsLessAdded);
  };

  useEffect(() => { }, [renTab, alerts]);
  return (
    <>
      {renTab}
      <Box>
        <Typography variant='h6' align="center" mb={2}>Add participant categories</Typography>
        <Paper>
          <Box pt={2} pb={1}>

            <Grid container>
              <Grid item xs={10}>
                <Stack direction="row" px={2} spacing={2}>

                  <TextField fullWidth select label="Gender" value={toRender.gender}
                    onChange={(e) => setToRender({ ...toRender, gender: e.target.value })} required
                    SelectProps={{ multiple: false }} validate="true">
                    <MenuItem key={'gm0'} value={'M'}>Men</MenuItem>
                    <MenuItem key={'gf0'} value={'F'}>Women</MenuItem>
                  </TextField>
                  <TextField fullWidth select label="Distance" required SelectProps={{ multiple: false }} validate="true"
                    defaultValue={toRender.distance}
                    onChange={(e) => setToRender({ ...toRender, distance: e.target.value })}>
                    {distances.map((entry, ind) => <MenuItem key={ind} value={entry}>{entry}</MenuItem>)}
                  </TextField>

                  <TextField fullWidth select label="Age" required SelectProps={{ multiple: false }} validate="true"
                    defaultValue={toRender.age}
                    onChange={(e) => setToRender({ ...toRender, age: e.target.value })}>
                    {ages.map((entry, ind) => <MenuItem key={ind} value={entry}>{entry}</MenuItem>)}
                  </TextField>

                  <input type="number" hidden="true" min={1} value={renTab.length} onInvalid={noTables} required validate/>
                
                </Stack>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={1}>
                <IconButton size="large" sx={{ float: 'right' }} onClick={handleAddClicked}>
                  <AddCircleOutline fontSize="large" />
                </IconButton>
              </Grid>
              <Grid item xs={12}>{alerts}</Grid>
            </Grid>
          
          </Box>
        </Paper>
      </Box>

    </>

  );
}
