import { grey, orange } from "@mui/material/colors";
import { createTheme } from "@mui/system/index.js";

const theme = createTheme({
    palette: {
        primary: {
            main: orange[800],
        },
        secondary: {
            main: grey[800]
        }
    }
});

export default theme;