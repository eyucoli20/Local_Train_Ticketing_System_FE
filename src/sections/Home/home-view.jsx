import React, { useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved, import/no-duplicates
import { makeStyles } from '@mui/styles';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Grid,
  Paper,
  Button,
  Container,
  TextField,
  Typography,
// eslint-disable-next-line import/no-duplicates
} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    backgroundImage: (props) => `url(${props.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add a semi-transparent background
  },
  searchContainer: {
    marginTop: theme.spacing(4),
  },
}));

const HomeView = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    'https://example.com/default-background.jpg' // Replace with your default background image
  );

  const classes = useStyles({ backgroundImage });

  const handleBackgroundChange = () => {
    // Implement logic to change the background image dynamically
    // For example, you can fetch a new image from an API
    const newImage = 'https://example.com/new-background.jpg';
    setBackgroundImage(newImage);
  };

  return (
    <Container className={classes.container} maxWidth="md" style={{marginTop:'10vh'}}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to Train Booking
      </Typography>
      <Typography variant="subtitle1" align="center" paragraph>
        Book your train tickets hassle-free with us!
      </Typography>

      <Grid container spacing={3} className={classes.searchContainer}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              Search Trains
            </Typography>
            <TextField
              label="From"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="To"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleBackgroundChange}
            >
              Search
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              Special Offers
            </Typography>
            <Typography variant="body1" paragraph>
              Check out our latest offers on train bookings. Save big!
            </Typography>
            <Button variant="outlined" color="primary">
              View Offers
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeView;
