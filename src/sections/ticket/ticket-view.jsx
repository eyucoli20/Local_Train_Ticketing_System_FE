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

import CancelIcon from '@mui/icons-material/Cancel';
import {
  Box,
  Container,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import { useGet } from '../../service/useGet';
// import { validateUser } from "../utils/validation";
import { useUpdate } from '../../service/useUpdate';
// import { useDelete } from '../../service/useDelete';

function TicketPage() {
  const [trainId, setTrainId] = React.useState('');
//   const [manager, setManager] = React.useState('');
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
        accessorKey: 'bookingTime',
        header: 'Booking Time',
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
  } = useGet(`api/v1/tickets/mine?trainId=${trainId}`);

  const {
    data: fetchedTrain,
    isPending: isLoadingTrain,
  } = useGet('/api/v1/trains');

  const { mutateAsync: updateBookedTicket } = useUpdate(`api/v1/tickets/cancel?trainId=${trainId}`);
  //call DELETE hook
//   const { isPending: isDeletingUser } = useDelete();


  //UPDATE action
  const handleCancledTicket = async ({ values, table }) => {
    const bookedCancle = {
      "seatNumbers": rowSelectionId
    }

    if (window.confirm('Are you sure you want to Cancle Booked Ticket?')) {
      await updateBookedTicket(bookedCancle);
    }
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
    // onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleCancledTicket,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Cancel Booked">
          {row?.original?.status === 'CONFIRMED'?
          <IconButton disabled>
          <CancelIcon />
        </IconButton>:
<IconButton onClick={handleCancledTicket}>
<CancelIcon />
</IconButton>}
          {/* <IconButton onClick={() => table.setEditingRow(row)}>
            <CancelIcon />
          </IconButton> */}
        </Tooltip>
      </Box>
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
        My Ticked Page
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

export default TicketPage;
