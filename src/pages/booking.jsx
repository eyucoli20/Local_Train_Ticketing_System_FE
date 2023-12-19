import { Helmet } from 'react-helmet-async';

import { BookView } from 'src/sections/booking';

// ----------------------------------------------------------------------

export default function BookPage() {
  return (
    <>
      <Helmet>
        <title>Booking </title>
      </Helmet>
      <BookView />
    </>
  );
}
