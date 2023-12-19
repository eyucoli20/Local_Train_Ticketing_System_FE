/* eslint-disable react/prop-types */
/* eslint-disable import/named */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable spaced-comment */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useMemo, useState} from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

import {
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { useGet } from '../../service/useGet';
// import { validateUser } from "../utils/validation";
import { useUpdate } from '../../service/useUpdate';
// import { useDelete } from '../../service/useDelete';

function BookingPage() {
  const [trainId, setTrainId] = React.useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [rowSelectionId, setRowSelectionId] = useState([]);

  // const formik = useFormik({
  //   6     initialValues: {
  //   7       firstName: '',
  //   8       lastName: '',
  //   9       email: '',
  //   10     },
  //   11     onSubmit: values => {
  //   12
  //   13     },
  //   14   });

  // eslint-disable-next-line spaced-comment
  //call read hook of role api

  // api/v1/users?role=MANAGER


  const columns = useMemo(
    () => [
      {
        accessorKey: 'fairPerSeat',
        header: 'Fair Per Seat',
      },    
      {
        accessorKey: 'seatNumber',
        header: 'Seat Number',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
    ],
    []
  );

  //call CREATE hook
  // const { mutateAsync: createUser, isPending: isCreatingUser } = usePost('/api/v1/locations');
  //call READ hook
  
  const {
    data: fetchedSchedules,
    isError:isLoadingScheduleError,
    // isFetching:isFetchingSchedule,
    // isPending: isLoadingSchedule,
  } = useGet(`api/v1/tickets?trainId=${trainId}&status=AVAILABLE`);

  const {
    data: fetchedTrain,
    isPending: isLoadingTrain,
  } = useGet('/api/v1/trains');

  // eslint-disable-next-line spaced-comment
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdate(`api/v1/tickets/book?trainId=${trainId}`);
  //call DELETE hook
//   const { isPending: isDeletingUser } = useDelete();



  //CREATE action
  const handleCreateSchedule = async ({ values }) => {
  
 console.log('rrrrr',rowSelectionId,rowSelection)
    const booked = {
        "seatNumbers": rowSelectionId
      }
 await updateUser(booked);
    table.setCreatingRow(null); //exit creating mode
  };

  useEffect(() => {
    const IdOfSelected = Object.keys(rowSelection);
    setRowSelectionId(IdOfSelected);
  }, [rowSelection]);


  const table = useMaterialReactTable({
    columns,
    data: fetchedSchedules || [],
    createDisplayMode: 'modal',
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    positionActionsColumn: 'last',
    getRowId: (row) => row.seatNumber,
    muiToolbarAlertBannerProps: isLoadingScheduleError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    // onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateSchedule,
    // onEditingRowCancel: () => setValidationErrors({}),
  
  
    //optionally customize modal content
   
  

    renderBottomToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        style={{
          width: '10%',
          margin: '5px',
          padding: '10px',
          backgroundColor: 'green',
          color: 'white',
        }}
        onClick={handleCreateSchedule}
      >
        {isUpdatingUser?"Booking..":'Book Train'} 
      </Button>
    ),

    // state: {
    //   isLoading: isLoadingSchedule,
    //   isSaving:  isUpdatingUser || isDeletingUser,
    //   showAlertBanner: isLoadingScheduleError,
    //   showProgressBars: isFetchingSchedule,
    // },
  });

  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Booking Page
      </Typography>
      <Container>
      <TextField
              fullWidth
              select
              style={{ marginTop: '10px' }}
              // id={name}
              name=""
              label="Train Name"
              value={trainId}
              onChange={(e)=> setTrainId(e.target.value)}
        
            >
              {fetchedTrain?.map((train) => (
                <MenuItem key={train?.id} value={train?.id}>
                  {isLoadingTrain?"loading...":train?.trainName}
                </MenuItem>
              ))}
            </TextField>
      </Container>
      <MaterialReactTable table={table} />
     
      

    </>
  );
}

export default BookingPage;
