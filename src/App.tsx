import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import DataTable from './components/DataTable';
import Container from "@mui/material/Container";
import IMAGE from './react.png'
import LOGO from './React.svg'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <h1>
          <img src={IMAGE} alt="React Logo" width="30" height="30" />
          Webpack, Material UI, Typicode, Typescript
          <img src={LOGO} alt="React Logo" width="30" />
          <p>{process.env.NODE_ENV}</p>
        </h1>
        <DataTable />
      </Container>
    </ThemeProvider>
  );
}

export default App;
