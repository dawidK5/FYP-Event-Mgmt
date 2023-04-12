import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { ThemeProvider } from '@emotion/react';
import { AppNavBar } from '../components/Home';
import { themeOrange } from '../data/constants';
import Grid from '@mui/material/Grid';
export default function About() {
  return (
    <>
      <ThemeProvider theme={themeOrange}>
        <AppNavBar />
        <Container>
          <Typography variant='h3' align='center' mt={4} mb={3}>About</Typography>
          <Container>
            <Grid container>
              <Grid item xs={6}>
                <Box variant="outlined" sx={{border: 1, borderColor: 'lightgrey', borderRadius: '16px'}} m={3} p={1}><ul>
                  <li>Dawid Kocik, 4th Year</li>
                  <li>Web app for sports event management in rowing</li>
                  <li>Made as for Z12 Performance, Irish sports tech startup</li>
                </ul>
                </Box>
                <Box variant="outlined" sx={{border: 1, borderColor: 'lightgrey', borderRadius: '16px'}} m={3} p={1}><ul>
                  <li>Literature review: MVC, quality attributes, requirements engineering</li>
                  <li>Z12 provided some of th initial UI prototypes</li>
                  <li>Modern tech stack: React, MUI, Django, Django Rest Framework, MongoEngine, MongoDB</li>
                  <li>Primarily Python and JavaScript</li>
                </ul></Box>
              </Grid>
              <Grid item xs={6}>

                <Box variant="outlined" sx={{border: 1, borderColor: 'lightgrey', borderRadius: '16px'}} m={3} p={1}><ul>
                  <li>Focus on quality attributes</li>
                  <li>Security: sessions, latest OWASP guidelines</li>
                  <li>Usability: design built-in, Nielsen's heuristics</li>
                  <li>Extensibility: separation of concerns, MVC</li>
                </ul></Box>

                  <Box variant="outlined" sx={{border: 1, borderColor: 'lightgrey', borderRadius: '16px'}} m={3} p={1}><ul>
                    <li>Evaluation tools: SonarCloud, OWASP ZAP penetration testing</li>
                    <li>Usability: Awaiting approval from the Ethics Committee, 10 questions survey</li>
                    <li>James Mangan, world class rowing coach, Z12 Performance founder</li>
                    <li>New opportunities in the evolving domain</li>
                  </ul></Box>

              </Grid>
            </Grid>
          </Container>
        </Container>
      </ThemeProvider>
    </>);
}