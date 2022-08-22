import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Typography, Card, Box, Modal, Stack, Button, TextField } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { clsx } from 'clsx';

const style = {
  height: 600,
  padding: 1,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  borderRadius: 2,
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  '& .super-app-theme--cell': {
    backgroundColor: 'rgba(224, 183, 60, 0.55)',
    color: '#1a3e72',
    fontWeight: '600',
  },
  '& .super-app.negative': {
    backgroundColor: '#d47483',
    color: '#1a3e72',
    fontWeight: '600',
  },
  '& .super-app.positive': {
    backgroundColor: 'rgba(157, 255, 118, 0.49)',
    color: '#1a3e72',
    fontWeight: '600',
  },
};

PerformaTable.propTypes = {
  header: PropTypes.string,
  title: PropTypes.string.isRequired,
  rows: PropTypes.array,
};

export default function PerformaTable({ header, title, rows, value, value1, handleChange, handleChange1, submit }) {
  const columns = [
    { field: 'id', headerName: 'No', flex: 0.5 },
    { field: 'nama', headerName: header, flex: 2 },
    {
      field: 'total',
      headerName: 'Tiket Selesai',
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'rateTarget',
      headerName: 'Persentase (%)',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: (params) => {
        if (params.value == null) {
          return '';
        }
        return clsx('super-app', {
          negative: params.value < 95,
          positive: params.value > 95,
        });
      },
    },
  ];

  const details = [
    { field: 'id', headerName: 'No', flex: 0.5 },
    { field: 'nama', headerName: header, flex: 2 },
    {
      field: 'total',
      headerName: 'Tiket Selesai',
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    { field: 'targetIn', headerName: 'Sesuai Target', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
    {
      field: 'targetOut',
      headerName: 'Keluar Target',
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'rateTarget',
      headerName: 'Persentase (%)',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: (params) => {
        if (params.value == null) {
          return '';
        }
        return clsx('super-app', {
          negative: params.value < 95,
          positive: params.value > 95,
        });
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [pageSize, setPageSize] = React.useState(10);

  // const d = new Date();
  // const [value, setValue] = React.useState(d.setDate(1));
  // const [value1, setValue1] = React.useState(new Date);

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };

  // const handleChange1 = (newValue1) => {
  //   const lastDay = new Date(newValue1.getFullYear(), newValue1.getMonth() + 1, 0);
  //   setValue1(lastDay);
  // };

  return (
    <Card>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" sx={{ pl: 3, pt: 3 }}>
          {title}
        </Typography>
        <Box sx={{ pr: 5, pt: 3 }}>
          <Button variant="text" onClick={handleOpen}>
            Lihat Semua
          </Button>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              {title}
            </Typography>
            <Box sx={{ height: 510 }}>
              <DataGrid
                rows={rows}
                columns={details}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[10, 15, 20]}
                pagination
                disableColumnSelector
                disableDensitySelector
                components={{ Toolbar: GridToolbar }}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 1000 },
                    csvOptions: {
                      fileName: `${title}`,
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </Modal>
      </Stack>

      <Stack direction="row" justifyContent="space-around">
        <Box sx={{ pt: 2, pb: 1, width: 180 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={['month']}
              inputFormat="MMMM"
              disableMaskedInput
              label="Month Start"
              openTo="month"
              value={value}
              minDate={new Date('2022-01-01')}
              maxDate={value1}
              onChange={handleChange}
              renderInput={(params) => <TextField size="small" {...params} helperText={null} />}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ pt: 2, pb: 1, width: 180 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={['month']}
              inputFormat="MMMM"
              disableMaskedInput
              label="Month End"
              openTo="month"
              minDate={value}
              maxDate={new Date('2022-08-31')}
              value={value1}
              onChange={handleChange1}
              renderInput={(params) => <TextField size="small" {...params} helperText={null} />}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ pt: 2, pb: 1 }}>
          <Button variant="outlined" onClick={submit}>
            Filter
          </Button>
        </Box>
      </Stack>

      <Box
        sx={{
          height: 365,
          padding: 2,
          '& .super-app-theme--cell': {
            backgroundColor: 'rgba(224, 183, 60, 0.55)',
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .super-app.negative': {
            backgroundColor: '#d47483',
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .super-app.positive': {
            backgroundColor: 'rgba(157, 255, 118, 0.49)',
            color: '#1a3e72',
            fontWeight: '600',
          },
        }}
      >
        <DataGrid hideFooter rows={rows} columns={columns} pageSize={5} />
      </Box>
    </Card>
  );
}
