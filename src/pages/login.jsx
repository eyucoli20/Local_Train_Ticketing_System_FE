import { Helmet } from 'react-helmet-async';

import { LoginView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function LocationPage() {
  return (
    <>
      <Helmet>
        <title> Login | Ticket </title>
      </Helmet>

      <LoginView />
    </>
  );
}
