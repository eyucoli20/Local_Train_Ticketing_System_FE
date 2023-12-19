/* eslint-disable react/prop-types */
/* eslint-disable import/named */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable spaced-comment */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
/* eslint-disable import/no-unresolved */
import React, { useMemo } from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

import {
  Typography,
} from '@mui/material';





function BookSearchList({availableTrains}) {
    console.log('aaaaaaaaa',availableTrains)

  

  const columns = useMemo(
    () => [
      {
        accessorKey: 'trainName',
        header: 'Train Name',
      },
      {
        accessorKey: 'trainNumber',
        header: 'Train Number',
      },
      {
        accessorKey: 'departureStation',
        header: 'Departure Station',
      },
      {
        accessorKey: 'arrivalStation',
        header: 'Arrival Station',
      },
      {
        accessorKey: 'departureTime',
        header: 'Departure Time',
      },
    ],
    []
  );

  






  const table = useMaterialReactTable({
    columns,
    data: availableTrains || [],
   
    getRowId: (row) => row.id,
  });

  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
          Available Trains Trip List
      </Typography>
      <MaterialReactTable table={table} />
    </>
  );
}

export default BookSearchList;
