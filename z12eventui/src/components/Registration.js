import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Checkbox from '@mui/material/Checkbox';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


export function AthleteCoachInputs(clubsList) {
  return (
    <>
      <Accordion>
        <AccordionSummary onClick={console.log('accordion clicked')} expandIcon={<Checkbox />}>
          <Typography>I am an athlete/rower</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField type="number" label="Weight in kg" required></TextField>
          <TextField type="number" label="Arm span in cm" required></TextField>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<Checkbox />}>
          <Typography>I am a coach/club manager</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField label="From (club)" name="club" select defaultValue={0} required={true}>
            {
              clubsList.map((clubEntry) => (
                <MenuItem key={clubEntry.id} value={clubEntry.id}>{clubEntry.name}</MenuItem>
              ))
            }
          </TextField>
          <TextField label="I am coaching (athletes)" name="athletes" select defaultValue={0} required={true}>
            {
              clubsList.map((clubEntry) => (
                <MenuItem key={clubEntry.id} value={clubEntry.id}>{clubEntry.name}</MenuItem>
              ))
            }
          </TextField>
        </AccordionDetails>
      </Accordion>
      {/* <FormControlLabel control={<Checkbox onChange={}/>} label="I am an athlete/rower" />
       
      <FormControlLabel control={<Checkbox />} label="I am a coach" />
      <FormControlLabel control={<Checkbox />} label="I am a club manager" /> */}
    </>

  );
}

export function BasicRegistrationInputs(clubsList) {
    const currentDate = new Date(Date.now()).toISOString().substring(0, 10);
    const arr = clubsList.clubsList;
    return (
      <>
        <TextField label="Name (first and surname)" type="name" name="name" required={true} />
        <TextField label="Email" type="email" name="email" validate="true" required={true}></TextField>
        <TextField label="Password" type="password" name="password" required={true} />
        <TextField label="Confirm password" type="password" name="confirm_password" required={true} />
        <TextField type="date" name="dob" max={currentDate} step="1" validate="true" required={true} />
        <TextField label="Phone number (including country prefix)" type="tel" name="phone" validate="true" required={true} />
        <TextField label="Club you are affiliated with" name="club" select defaultValue={0} SelectProps={{ multiple: false }} required={true}>
          {
            (arr.length > 0) ? (arr.map((clubEntry) => (
              <MenuItem key={clubEntry.id} value={clubEntry.id}>{clubEntry.name}</MenuItem>
            ))) : null
          }
        </TextField>
        <FormGroup>
          <FormControlLabel control={<Checkbox required={true} />} label={<span>I agree with <a href="/terms">Terms and Conditions</a></span>} />
          <FormControlLabel control={<Checkbox required={true} />} label={<span>I agree with <a href="/privacy">Privacy Policy</a></span>} />
        </FormGroup>
      </>
    );
}
