import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Typography, Card, Box, Modal, Stack, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { clsx } from 'clsx';

const style = {
  height: 580,
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
}

export default function PerformaTable({ header, title, rows }) {
  const columns = [
    { field: 'id', headerName: 'No', flex: 0.5 },
    { field: 'nama', headerName: header, flex: 2 },
    {
      field: 'total', headerName: 'Tiket Selesai', type: 'number', headerAlign: 'center',
      align: 'center', flex: 1
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
          negative: params.value < 80,
          positive: params.value > 80,
        });
      },
    },
  ];

  const details = [
    { field: 'id', headerName: 'No', flex: 0.5 },
    { field: 'nama', headerName: header, flex: 2 },
    { field: 'targetIn', headerName: 'Sesuai Target', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
    { field: 'targetOut', headerName: 'Keluar Target', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
    {
      field: 'total', headerName: 'Tiket Selesai', type: 'number', headerAlign: 'center',
      align: 'center', flex: 1
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
          negative: params.value < 80,
          positive: params.value > 80,
        });
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [pageSize, setPageSize] = React.useState(10);

  return (
    <Card>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" sx={{ pl: 3, pt: 3, pb: 1 }}>
          {title}
        </Typography>
        <Box sx={{ pr: 5, pt: 3, pb: 1 }}>
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
                },
              }}
            />
          </Box>
        </Modal>
      </Stack>
      <Box
        sx={{
          height: 416,
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
        <DataGrid hideFooter="true" rows={rows} columns={columns} pageSize={6} />
      </Box>
    </Card>
  );
}