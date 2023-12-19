import { Helmet } from 'react-helmet-async';

import { ScheduleView } from 'src/sections/scheduleTrain';

// ----------------------------------------------------------------------

export default function SchedulePage() {
  return (
    <>
      <Helmet>
        <title> Schedule </title>
      </Helmet>

      <ScheduleView />
    </>
  );
}
