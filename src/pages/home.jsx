import { Helmet } from 'react-helmet-async';

import { HomeView } from 'src/sections/Home';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Home | Ticket  </title>
      </Helmet>

      <HomeView />
    </>
  );
}
