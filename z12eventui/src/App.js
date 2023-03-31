import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import { RegisterFirstPage, RegisterSecondPage } from './pages/Register';
import { CreateEventBasic, EventDetailPage } from './pages/Events';

// import Box from '@mui/material/Box';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import Notifications from '@mui/icons-material/Notifications'
// import { orange } from '@mui/material/colors';
// import { ThemeProvider } from '@mui/system';

// import { Accordion, AccordionDetails, AccordionSummary, AlertTitle, CardContent, CardHeader, CardMedia, Checkbox, Container, FormControl, FormGroup, Grid, Hidden, InputLabel, Link, MenuItem, MenuList, Popover, Popper, Select, TextField } from '@mui/material';
// import Container from '@mui/material/Container';
// import TextField from '@mui/material/TextField';
// import AlertTitle from '@mui/material/AlertTitle';

// import MenuItem from '@mui/material/MenuItem';
// import Popper from '@mui/material/Popper';
// import MenuList from '@mui/material/MenuList';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import Card from '@mui/material/Card';
// import FormGroup from '@mui/material/FormGroup';
// import Menu from '@mui/material/Menu';
// import cardImage from '../public/img/card_cover_1.png';
import theme from './styles/theme/index';
import { Routes, Route, Link as RLink, redirect, useNavigate } from 'react-router-dom';
// import Stack from '@mui/material/Stack';
// import CssBaseline from '@mui/material/CssBaseline';
// import Paper from '@mui/material/Paper';
// import Profiler from 'react';

// import DatePicker from 'react-date-picker';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Alert from '@mui/material/Alert';
// import { createTheme } from '@mui/material/styles';

// import Home from './pages/home.js';
function App() {
  console.log(`============== Theme: ${theme}`);
  // const [loggedIn, setLoggedIn] = useState(authenticated);
  document.title = "Z12 Events Manager - All Events"

  return (
  <Routes>
    <Route path="/" element={<Home authenticated={false} />} />
    <Route path="/home" element={<Home authenticated={true} />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterFirstPage />} />
    <Route path="/registerMinor" element={<RegisterSecondPage />} />
    <Route path="/createEvent" element={<CreateEventBasic />} />
    <Route path="/events/1" element={<EventDetailPage />} />
  </Routes>
  );
}

export default App;