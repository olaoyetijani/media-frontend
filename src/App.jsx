import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material";

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
