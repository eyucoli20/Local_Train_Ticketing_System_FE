import React, { useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Grid,
  Paper,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';

import api from '../../service/api';
import BookSearchList from './book-search-list';

const BookView = () => {
  const [departureTerminal, setDepartureTerminal] = useState(null);
  const [arrivalTerminal, setArrivalTerminal] = useState(null);
  const [availableTrains, setAvailableTrains] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (departureTerminal === null || arrivalTerminal === null) {
      setSearching(true);
    } else {
      setSearching(true);
      const departureResponse = await api.get(
        `api/v1/trains/station?stationName=${departureTerminal}&station=0`
      );
      const arrivalResponse = await api.get(
        `api/v1/trains/station?stationName=${arrivalTerminal}&station=1`
      );
      const departureData = await departureResponse?.data;
      const arrivalData = await arrivalResponse?.data;
      const availableTrainsData = [...departureData, ...arrivalData];
      console.log(availableTrains);
      setAvailableTrains(availableTrainsData);
    }
  };

  return (
    <Container style={{ marginTop: '10vh', width: '100%' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Booking Page
      </Typography>

      <Paper style={{ padding: 20, marginBottom: 20 }}>
        <Typography variant="h6" gutterBottom>
          Enter Departure and Arrival Terminals
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Departure Terminal"
              variant="outlined"
              fullWidth
              value={departureTerminal}
              onChange={(e) => setDepartureTerminal(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Arrival Terminal"
              variant="outlined"
              fullWidth
              value={arrivalTerminal}
              onChange={(e) => setArrivalTerminal(e.target.value)}
            />
          </Grid>
        </Grid>
        <Container
          style={{ marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search Trains
          </Button>
        </Container>
      </Paper>
      {availableTrains?.length === 0 ? (
        <>{searching ? <CircularProgress /> : ''}</>
      ) : (
        <BookSearchList availableTrains={availableTrains} />
      )}
    </Container>
  );
};

export default BookView;
