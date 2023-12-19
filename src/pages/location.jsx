import { Helmet } from 'react-helmet-async';

import { LocationView } from 'src/sections/location';


// ----------------------------------------------------------------------

export default function RoutinePage() {
  return (
    <>
      <Helmet>
        <title> location </title>
      </Helmet>

      <LocationView />
    </>
  );
}
