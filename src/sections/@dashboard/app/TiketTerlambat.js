import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Typography, Card, Box, Modal, Stack, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { clsx } from 'clsx';

const style = {
  height: 550,
  padding: 1,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
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

TiketTerlambat.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.array,
};

export default function TiketTerlambat({ title, rows }) {
  const columns = [
    { field: 'id', headerName: 'Tiket ID', flex: 1 },
    { field: 'jenisMasalah', headerName: 'Jenis Masalah', flex: 3 },
    {
      field: 'terlambat',
      headerName: 'Terlambat (hari)',
      type: 'number',
      flex: 1.5,
      headerAlign: 'center',
      align: 'center',
      cellClassName: (params) => {
        if (params.value == null) {
          return '';
        }
        return clsx('super-app', {
          negative: params.value,
        });
      },
    },
  ];

  const details = [
    { field: 'id', headerName: 'Tiket ID', flex: 1 },
    { field: 'tid', headerName: 'TID', flex: 1 },
    { field: 'lokasi', headerName: 'Lokasi', flex: 3 },
    { field: 'status', headerName: 'Status', flex: 1.5 },
    {
      field: 'bagian',
      headerName: 'Bagian',
      flex: 1,
    },
    { field: 'jenisMasalah', headerName: 'Jenis Masalah', flex: 2 },
    {
      field: 'tanggal',
      headerName: 'Entry Tiket',
      flex: 1.5,
    },
    {
      field: 'targetHari',
      headerName: 'Target (hari)',
      type: 'number',
      flex: 1.5,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'terlambat',
      headerName: 'Terlambat (hari)',
      type: 'number',
      flex: 1.5,
      headerAlign: 'center',
      align: 'center',
      cellClassName: (params) => {
        if (params.value == null) {
          return '';
        }
        return clsx('super-app', {
          negative: params.value,
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
        <Typography variant="h7" sx={{ pl: 3, pt: 3 }}>
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
              Daftar {title}
            </Typography>
            <Box sx={{ height: 450 }}>
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
          </Box>
        </Modal>
      </Stack>

      <Box
        sx={{
          height: 330,
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
