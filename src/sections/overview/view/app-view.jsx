
import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { MenuItem, TextField } from '@mui/material';

import { useGet } from 'src/service/useGet';

import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const [trainId, setTrainId] = React.useState('');
 
  const { data: user, isFetching: isFetchingUsers } = useGet('/api/v1/users');
  const { data: locations, isFetching: isFetchingTeams } = useGet('/api/v1/locations');
 


  const {
    data: fetchedBooks,
    isFetching:isFetchingBooked,
  } = useGet(`api/v1/tickets?trainId=${trainId}&status=BOOKED`);

  const {
    data: AvailableTicket,
    isFetching:isFetchingTicket,
  } = useGet(`api/v1/tickets?trainId=${trainId}&status=AVAILABLE`);

  const {
    data: fetchedTrain,
    isPending: isLoadingTrain,
  } = useGet('/api/v1/trains');

  const {
    data: fetchedSchedules,
    isFetching:isFetchingSchedule,
  } = useGet('api/v1/trains/scheduled');

  const TotalUser = user?.length;
  const TotalLocation = locations?.length;
  const TotalBookedTicket =  fetchedBooks?.length === 0 || undefined ? "0":fetchedBooks?.length;
  const TotalAvailableTicket =  AvailableTicket?.length === 0 || undefined ? "0":AvailableTicket?.length;
  const TotalTrain =  fetchedTrain?.length === 0 || undefined ? "0":fetchedTrain?.length;
  const TotalScheduled =  fetchedSchedules?.length === 0 || undefined ? "0":fetchedSchedules?.length;

  // const TotalManager = fetchedSchedules?.length;
  // console.log('tttttt',TotalManager)



  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back to Train Booking DashBoard
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={6}>
          <AppWidgetSummary
            title="Total Location"
            total={isFetchingTeams ? 'loading...' : TotalLocation}
            color="success"
            icon={<img alt="icon" src="/assets/icons/dashboard/location.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={6}>
          <AppWidgetSummary
            title="Total Users"
            total={isFetchingUsers ? 'Loading...' : TotalUser}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={6}>
          <AppWidgetSummary
            title="Total Scheduled Train"
            total={isFetchingSchedule ? 'Loading...' : TotalScheduled}
            color="info"
            icon={<img alt="icon" src="/assets/icons/dashboard/schedule.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={6}>
          <AppWidgetSummary
            title="Total Train"
            total={isLoadingTrain ? '' : TotalTrain}
            icon={<img alt="icon" src="/assets/icons/dashboard/train.png" />}
          />
        </Grid>
        <Container style={{display:'flex',justifyContent:'space-between'}}>
          
        <TextField
        fullWidth
            
              select
              style={{ marginTop: '10px',display:'flex',justifyContent:'center',alignItems:'center' }}
              // id={name}
              name=""
              label="Train Name"
              value={trainId}
              onChange={(e)=> setTrainId(e.target.value)}
        
            >
              {fetchedTrain?.map((train) => (
                <MenuItem key={train?.id} value={train?.id}>
                  {isLoadingTrain?"loading...":train?.trainName}
                </MenuItem>
              ))}
            </TextField>
        <Grid xs={12} sm={6} md={12}>
          <AppWidgetSummary
            title="Total Booked Ticket Tobe Confirmed"
            total={isFetchingBooked ? '' : TotalBookedTicket}
            icon={<img alt="icon" src="/assets/icons/dashboard/booked.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={12}>
          <AppWidgetSummary
            title="Total Available Ticket"
            total={isFetchingTicket ? '' : TotalAvailableTicket}
            icon={<img alt="icon" src="/assets/icons/dashboard/ticket.png" />}
          />
        </Grid>

        </Container>

       

        
      </Grid>
    </Container>
  );
}
