/* eslint-disable react/prop-types */
/* eslint-disable import/named */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable spaced-comment */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useFormik } from 'formik';
/* eslint-disable import/no-unresolved */
import React, { useMemo } from 'react';
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
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import { useGet } from '../../service/useGet';
import { usePost } from '../../service/usePost';
// import { validateUser } from "../utils/validation";
import { useUpdate } from '../../service/useUpdate';
import { useDelete } from '../../service/useDelete';

const validationSchema = Yup.object().shape({
  trainName: Yup.string().required('Train Name is required'),
  trainNumber: Yup.string().required('Train Number is required'),
  totalCoach: Yup.number().required('Total Coach is required').min(0),
  seatingCapacity: Yup.number().required('Seating Capacity is required').min(0),
  departureStation: Yup.string().required('Departure Station is required'),
  arrivalStation: Yup.string().required('Arrival Station is required'),
});

function TrainView() {

  

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'trainName',
        header: 'Train Name',
      },
      {
        accessorKey: 'trainNumber',
        header: 'Train Number',
      },
      {
        accessorKey: 'totalCoach',
        header: 'Total Coach',
      },
      {
        accessorKey: 'seatingCapacityPerCouch',
        header: 'Seating Capacity per Couch',
      },
      {
        accessorKey: 'departureStation',
        header: 'Departure Station',
      },
      {
        accessorKey: 'arrivalStation',
        header: 'Arrival Station',
      },
    ],
    []
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } = usePost('/api/v1/trains');
  //call READ hook
  const {
    data: fetchedLocations,
    isPending: isLoadingLocation,
  } = useGet('/api/v1/locations');


  const {
    data: fetchedTrains,
    isError: isLoadingTrainError,
    isFetching: isFetchingTrains,
    isLoading: isLoadingTrains,
  } = useGet('/api/v1/trains');
  // eslint-disable-next-line spaced-comment
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdate('/api/v1/trains');
  //call DELETE hook
  const { isPending: isDeletingUser } = useDelete();

  //CREATE action
  const handleCreateUser = async () => {
    await createUser(formik.values);
    formik.resetForm();
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

  const formik = useFormik({
    initialValues: {
      departureTime: '',
      trainNumber: '',
      totalCoach: null,
      seatingCapacityPerCouch: null,
      fairPerSeat:null,
      departureStation: '',
      arrivalStation: '',
    },
    validationSchema,
    onSubmit: (values) => {
  
    },
  });



  const table = useMaterialReactTable({
    columns,
    data: fetchedTrains || [],
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    positionActionsColumn: 'last',
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingTrainError
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
    onCreatingRowSave: handleCreateUser,
    // onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Add New Train Trip</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              name="trainName"
              style={{ marginTop: '10px' }}
              id="outlined-controlled"
              label="Train Name"
              value={formik.values.trainName}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              name="trainNumber"
              style={{ marginTop: '10px' }}
              id="outlined-controlled"
              label="Train Number"
              value={formik.values.trainNumber}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              name="totalCoach"
              type="number"
              style={{ marginTop: '10px' }}
              id="outlined-controlled"
              label="Total Coach"
              value={formik.values.totalCoach}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              name="seatingCapacityPerCouch"
              style={{ marginTop: '10px' }}
              id="outlined-controlled"
              label="Seating Capacity"
              value={formik.values.seatingCapacityPerCouch}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              name="fairPerSeat"
              style={{ marginTop: '10px' }}
              id="outlined-controlled"
              label="Fair per Seat"
              value={formik.values.fairPerSeat}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              select
              style={{ marginTop: '10px' }}
              // id={name}
              name="departureStation"
              label="Departure Station"
              value={formik.values.departureStation}
              onChange={formik.handleChange}
        
            >
              {fetchedLocations?.map((location) => (
                <MenuItem key={location?.id} value={location?.name}>
                  {isLoadingLocation?"loading...":location?.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              select
              style={{ marginTop: '10px' }}
              // id={name}
              name="arrivalStation"
              label="Arrival Station"
              value={formik.values.arrivalStation}
              onChange={formik.handleChange}
             
            >
              {fetchedLocations?.map((location) => (
                <MenuItem key={location?.id} value={location?.name}>
                  {isLoadingLocation?"loading...":location?.name}
                </MenuItem>
              ))}
            </TextField>
          </form>
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
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        style={{
          width: '10%',
          margin: '5px',
          padding: '10px',
          backgroundColor: 'green',
          color: 'white',
        }}
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Add Train Trip
      </Button>
    ),

    state: {
      isLoading: isLoadingTrains,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingTrainError,
      showProgressBars: isFetchingTrains,
    },
  });

  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Train list
      </Typography>
      <MaterialReactTable table={table} />
    </>
  );
}

export default TrainView;
