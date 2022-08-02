import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Card, Box } from '@mui/material';
import TiketDataService from '../../../helper/services';

const columns = [
  { field: 'id', headerName: 'No', flex: 0.2 },
  { field: 'jenisMasalah', headerName: 'Jenis Masalah', flex: 1.5 },
  { field: 'targetHari', headerName: 'Target (Hari)', type: 'number', headerAlign: 'center', align: 'center', flex: 0.5, color: '#1a3e72' },
];

export default function CustomizedTables() {
  const [listData, setListData] = useState([])
  useEffect(() => {
    jenisTiket()
  }, [])
  const jenisTiket = () => {
    TiketDataService.jenisTiket()
      .then((response) => {
        setListData(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Card>
      <Typography variant="h6" sx={{ pl: 3, pt: 3, pb: 1 }}>
        Jenis Tiket
      </Typography>
      <Box
        sx={{
          height: 410,
          padding: 1,
        }}
      >
        <DataGrid rows={listData} columns={columns} pageSize={6} rowsPerPageOptions={[6]} />
      </Box>
    </Card>
  );
}