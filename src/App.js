import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, Container, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import EmployeePage from './pages/EmployeePage';
import store from './redux/store';
import { makeServer } from './api/mirageServer';

// Initialize MirageJS server
makeServer();

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h4" align="center" style={{ margin: '20px 0' }}>
          Employee Management
        </Typography>
        <EmployeePage />
      </Container>
    </ThemeProvider>
  </Provider>
);

export default App;
