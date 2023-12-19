import React, { useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  List,
  Paper,
  ListItem,
  Container,
  Typography,
  ListItemText,
} from '@mui/material';

const RoutineDisplayPage = () => {
  // This is just placeholder data, replace it with actual data fetching logic
  // eslint-disable-next-line no-unused-vars
  const [terminals, setTerminals] = useState([
    { id: 1, name: 'Terminal A', schedule: '10:00 AM - 06:00 PM' },
    { id: 2, name: 'Terminal B', schedule: '08:00 AM - 04:00 PM' },
    // Add more terminal details as needed
  ]);

  return (
    <Container maxWidth="md" style={{marginTop:'10vh'}}>
      <Typography variant="h4" align="center" gutterBottom>
        Terminal Availability
      </Typography>

      <Paper style={{ padding: 20, marginBottom: 20 }}>
        <Typography variant="h6" gutterBottom>
          Available Terminals
        </Typography>

        {terminals.length > 0 ? (
          <List>
            {terminals.map((terminal) => (
              <ListItem key={terminal.id}>
                <ListItemText
                  primary={terminal.name}
                  secondary={`Schedule: ${terminal.schedule}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="textSecondary" align="center">
            No terminals available at the moment.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default RoutineDisplayPage;
