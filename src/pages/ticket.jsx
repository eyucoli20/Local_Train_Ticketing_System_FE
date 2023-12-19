import { Helmet } from 'react-helmet-async';

import { TicketView } from 'src/sections/ticket';

// ----------------------------------------------------------------------

export default function RoutinePage() {
  return (
    <>
      <Helmet>
        <title>Ticket </title>
      </Helmet>
      <TicketView />
    </>
  );
}
