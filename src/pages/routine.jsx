import { Helmet } from 'react-helmet-async';

import { RoutineView } from 'src/sections/routine';

// ----------------------------------------------------------------------

export default function RoutinePage() {
  return (
    <>
      <Helmet>
        <title> Routine </title>
      </Helmet>

      <RoutineView />
    </>
  );
}
