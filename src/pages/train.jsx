import { Helmet } from 'react-helmet-async';

import { TrainView } from 'src/sections/train';


// ----------------------------------------------------------------------

export default function RoutinePage() {
  return (
    <>
      <Helmet>
        <title> Train </title>
      </Helmet>

      <TrainView />
    </>
  );
}
