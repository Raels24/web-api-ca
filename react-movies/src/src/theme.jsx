import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#1397e4ff" }, 
    secondary: { main: "#ffffffff" },
    background: {
      default: "#000000ff",
      paper: "#000000ff",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: "8px", textTransform: "none" },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: "#1397e4ff" },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: { color: "black" },
      },
    },
  },
});

export default theme;
