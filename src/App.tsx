import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import DataTable from './components/DataTable';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <h1>Webpack, Material UI, Typicode, Typescript</h1>
      <CssBaseline />
      <div className="container">
        <DataTable />
      </div>
    </ThemeProvider>
  );
}

export default App;
