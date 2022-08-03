import React, { useEffect, useState } from 'react';
// @mui
import { Grid, Container, Typography, Card, Box, Modal, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { clsx } from 'clsx';
// data
import { CSVLink } from 'react-csv';
import TiketDataService from '../helper/services';
// components
import Page from '../components/Page';
// sections
import { AppWidgetSummary, Statistics, TableCard } from '../sections/@dashboard/app';

const columns = [
  { field: 'id', headerName: 'No', flex: 0.4 },
  { field: 'tanggal', headerName: 'Tanggal', flex: 1.5 },
  {
    field: 'tiketClose',
    headerName: 'Tiket Selesai',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    color: '#1a3e72',
  },
  {
    field: 'targetIn',
    headerName: 'Sesuai Target',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }
      return clsx('super-app', {
        in: params,
      });
    },
  },
  {
    field: 'targetOut',
    headerName: 'Keluar Target',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }
      return clsx('super-app', {
        out: params,
      });
    },
  },
  {
    field: 'rateTarget',
    headerName: 'Persentase (%)',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
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

const columns2 = [
  { field: 'id', headerName: 'Jenis Masalah', width: 280 },
  { field: 'tiketClose', headerName: 'Tiket Selesai', type: 'number', width: 110, align: 'center' },
  { field: 'targetIn', headerName: 'Sesuai Target', type: 'number', width: 110, align: 'center' },
  { field: 'targetOut', headerName: 'Keluar Target', type: 'number', width: 110, align: 'center' },
  {
    field: 'rateTarget',
    headerName: 'Persentase',
    type: 'number',
    width: 100,
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

const columns3 = [
  { field: 'id', headerName: 'Kantor Cabang', width: 280 },
  { field: 'total', headerName: 'Tiket Selesai', type: 'number', width: 110 },
  { field: 'targetIn', headerName: 'Sesuai Target', type: 'number', width: 110 },
  { field: 'targetOut', headerName: 'Keluar Target', type: 'number', width: 110 },
  {
    field: 'rateTarget',
    headerName: 'Persentase',
    type: 'number',
    width: 100,
    // valueGetter: (params) => `${params.row.rateTarget} %`,
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

export default function EDC() {
  const [tiket, setTiket] = useState([]);
  const [listTanggal, setListTanggal] = useState([]);
  const [listKanca, setListKanca] = useState([]);
  const [jenisTiket, setJenisTiket] = useState([]);

  useEffect(() => {
    getAll();
    perTanggal();
    performaKanca();
    perJenisMasalah();
  }, []);

  const getAll = () => {
    TiketDataService.getAll()
      .then((response) => {
        setTiket(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const perTanggal = () => {
    TiketDataService.perTanggal()
      .then((response) => {
        setListTanggal(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const performaKanca = () => {
    TiketDataService.performaKanca()
      .then((response) => {
        setListKanca(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const perJenisMasalah = () => {
    TiketDataService.perJenisMasalah()
      .then((response) => {
        setJenisTiket(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const targetIn = tiket.filter((tiket) => tiket.targetIn === 1);
  console.log(targetIn);

  const targetOut = tiket.filter((tiket) => tiket.targetIn === 0);
  console.log(targetOut);

  const rate = (targetIn.length / tiket.length) * 100;
  console.log(rate);

  return (
    <Page title="EDC">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          EDC Section
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary
              title="Tiket Selesai"
              total={tiket.length}
              icon={'ant-design:file-done-outlined'}
              rows={tiket}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary
              title="Sesuai Target"
              total={targetIn.length}
              color="success"
              icon={'icon-park-solid:doc-success'}
              rows={targetIn}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary
              title="Keluar Target"
              total={targetOut.length}
              color="error"
              icon={'icon-park-solid:file-failed'}
              rows={targetOut}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary
              title="Rate Target"
              total={rate}
              percent="%"
              color="secondary"
              icon={'iconoir:percentage-round'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <Card>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" sx={{ pl: 3, pt: 3, pb: 1 }}>
                  Ticket Handle Last Week
                </Typography>
                <Box sx={{ pr: 5, pt: 3, pb: 1 }}>
                  <CSVLink data={jenisTiket} filename={'file.csv'}>
                    Download CSV
                  </CSVLink>
                </Box>
              </Stack>
              <Box
                sx={{
                  height: 330,
                  padding: 1,
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
                    // color: '#1a3e72',
                    fontWeight: '600',
                  },
                  '& .super-app.in': {
                    // backgroundColor: 'rgba(157, 255, 118, 0.49)',
                    color: '#2e7d32',
                    fontWeight: '800',
                  },
                  '& .super-app.out': {
                    // backgroundColor: 'rgba(157, 255, 118, 0.49)',
                    color: '#d32f2f',
                    fontWeight: '800',
                  },
                }}
              >
                <DataGrid rows={listTanggal} columns={columns} pageSize={6} rowsPerPageOptions={[6]} />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <Box
                sx={{
                  height: 480,
                  padding: 1,
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
                <DataGrid rows={jenisTiket} columns={columns2} pageSize={6} rowsPerPageOptions={[6]} />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <Box
                sx={{
                  height: 480,
                  padding: 1,
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
                <DataGrid rows={listKanca} columns={columns3} pageSize={6} rowsPerPageOptions={[6]} />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Statistics />
          </Grid>

          <Grid item xs={12} md={4}>
            <TableCard />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

