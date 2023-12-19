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
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import { useGet } from '../../service/useGet';
// import { validateUser } from "../utils/validation";
import { useUpdate } from '../../service/useUpdate';
// import { useDelete } from '../../service/useDelete';

function BookedPage() {
  const [trainId, setTrainId] = React.useState('');
//   const [manager, setManager] = React.useState('');
  const [departureTime, setDepartureTime] = React.useState('');
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
  } = useGet(`api/v1/tickets?trainId=${trainId}&status=BOOKED`);

  const {
    data: fetchedTrain,
    isPending: isLoadingTrain,
  } = useGet('/api/v1/trains');

  // eslint-disable-next-line spaced-comment
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdate(`api/v1/tickets/confirm?trainId=${trainId}`);
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

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {


    const data = {
      fullName: values?.fullName,
    };

    await updateUser(data);
    table.setEditingRow(null); //exit editing mode
  };


  useEffect(() => {
    const IdOfSelected = Object.keys(rowSelection);
    setRowSelectionId(IdOfSelected);
  }, [rowSelection]);


  const table = useMaterialReactTable({
    columns,
    data: fetchedSchedules || [],
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
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
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Create New Location</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
          <InputLabel id="demo-simple-select-label">Schedule Time</InputLabel>
          <TextField
            type="datetime-local"
            style={{ marginTop: '10px' }}
            id="outlined-controlled"
            value={departureTime}
            onChange={(e)=> setDepartureTime(e.target.value) }
          />
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Edit Location</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
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
        {isUpdatingUser?"Confirming...":'Confirm Booked'} 
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
        Booked List Page
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

export default BookedPage;
