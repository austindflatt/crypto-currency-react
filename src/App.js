import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CryptoContext from './components/context/crypto/CryptoContext'
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import NavBar from './components/NavBar/NavBar'
import CryptoPage from './components/Pages/CryptoPage'
import HomePage from './components/Pages/HomePage'
import AboutPage from './components/Pages/AboutPage'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <CryptoContext>
    <Router>
      <ThemeProvider theme={darkTheme}>
      <NavBar />
      <CssBaseline />
      <Box m={2} pt={3}>
      <Container maxWidth="xl">
      {/* <AlertMessage /> */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/price/:id' element={<CryptoPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/404' element={null} />
          <Route path='/*' element={null} />
        </Routes>
      </Container>
      </Box>
      </ThemeProvider>
    </Router>
    </CryptoContext>
  );
}

export default App;