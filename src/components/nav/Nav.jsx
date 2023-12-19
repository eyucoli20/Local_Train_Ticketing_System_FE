import * as React from 'react';

import Tab from '@mui/material/Tab';
import { Box, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import DirectionsSubwayFilledIcon from '@mui/icons-material/DirectionsSubwayFilled'; // Import useHistory from 'react-router-dom'
import { useRouter } from 'src/routes/hooks';

export default function IconPositionTabs() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container
      sx={{
        width: '100%',
      }}
      style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-around', alignSelf: 'center' }}
    >
      <Box style={{ display: 'flex', justifyContent: 'space-between' }} value={value} onChange={handleChange}>
        <Tab icon={<HomeIcon />} label="Home" onClick={() => router.push('/')} />
        <Tab icon={<BookOnlineIcon />} label="Book" onClick={() => router.push('/booking')}/>
        <Tab icon={<DirectionsSubwayFilledIcon />} label="Routine" onClick={() => router.push('/routine')} />
        <Tab icon={<LoginIcon />} label="Login" onClick={() => router.push('/login')} /> 
      </Box>
    </Container>
  );
}



