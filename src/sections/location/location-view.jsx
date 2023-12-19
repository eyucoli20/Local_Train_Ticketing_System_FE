/* eslint-disable react/prop-types */
/* eslint-disable import/named */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable spaced-comment */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useMemo, useState } from 'react';
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
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import { useGet } from '../../service/useGet';
import { usePost } from '../../service/usePost';
// import { validateUser } from "../utils/validation";
import { useUpdate } from '../../service/useUpdate';
import { useDelete } from '../../service/useDelete';

function LocationPage() {
  const [validationErrors, setValidationErrors] = useState({});
  const [name, setName] = React.useState('');
  const [locationId, setLocationId] = React.useState('');

//   const [manager, setManager] = React.useState('');
  const [description, setDescription] = React.useState('');



  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'name',
        header: 'Location Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.fullName,
          helperText: validationErrors?.fullName,
          // remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
          // optionally add validation checking for onBlur or onChange
        },
      },    
      {
        accessorKey: 'description',
        header: 'description',
      },
    ],
    [validationErrors]
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } = usePost('/api/v1/locations');
  //call READ hook
  const {
    data: fetchedUsers,
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGet('/api/v1/locations');

  // eslint-disable-next-line spaced-comment
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdate(`/api/v1/locations/${locationId}`);
  //call DELETE hook
  const { isPending: isDeletingUser } = useDelete();

  //CREATE action
  const handleCreateUser = async ({ values }) => {
  

    const transformedData = {
      "name": name,
      "description": description,
    }
    
    await createUser(transformedData);
    setName('');
    setDescription('')
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    setLocationId(values?.id)

    const data = {
      name: values?.name,
      description:values?.description
    };

    await updateUser(data);
    table.setEditingRow(null); //exit editing mode
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers || [],
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    positionActionsColumn: 'last',
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
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
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Create New Location</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TextField
            style={{ marginTop: '10px' }}
            id="outlined-controlled"
            label="Location Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

          <TextField
            style={{ marginTop: '10px' }}
            id="outlined-controlled"
            label="Description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
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
        Create New Location
      </Button>
    ),

    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Location list
      </Typography>
      <MaterialReactTable table={table} />
     
      

    </>
  );
}

export default LocationPage;
