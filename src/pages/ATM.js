import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
// @mui
import { Grid, Container, Typography, Card, Box, Modal, Stack, TextField, Button, Link } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { clsx } from 'clsx';
// data
import { CSVLink } from 'react-csv';
import TiketDataService from '../helper/services';
// components
import Page from '../components/Page';
// sections
import {
  AppWidgetSummary,
  Statistics,
  TableCard,
  AppWebsiteVisits,
  AppConversionRates,
  Percentage,
} from '../sections/@dashboard/app';

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
  { field: 'id', headerName: 'No', width: 50 },
  { field: 'nama', headerName: 'Implementor', width: 280 },
  { field: 'total', headerName: 'Tiket Selesai', type: 'number', width: 110, align: 'center' },
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
  { field: 'id', headerName: 'No', flex: 0.5 },
  { field: 'nama', headerName: 'Kantor Cabang', flex: 2 },
  { field: 'total', headerName: 'Tiket Selesai', type: 'number', flex: 1 },
  {
    field: 'rateTarget',
    headerName: 'Persentase',
    type: 'number',
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
};

export default function ATM() {
  const [tiket, setTiket] = useState([]);
  const [listTanggal, setListTanggal] = useState([]);
  const [listKanca, setListKanca] = useState([]);
  const [jenisTiket, setJenisTiket] = useState([]);
  const [listMinggu, setListMinggu] = useState([]);
  const [Implementor, setImplementor] = useState([]);

  useEffect(() => {
    getAll();
    perTanggal();
    performaKanca();
    perJenisMasalah();
    perMinggu();
    performaPemasang();
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
  const perMinggu = () => {
    TiketDataService.perMinggu()
      .then((response) => {
        setListMinggu(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const performaPemasang = () => {
    TiketDataService.performaPemasang()
      .then((response) => {
        setImplementor(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const minggu = listMinggu.map(({ sampai }) => sampai);
  const total = listMinggu.map(({ total }) => total);
  const totalIn = listMinggu.map(({ targetIn }) => targetIn);

  const targetIn = tiket.filter((tiket) => tiket.targetIn === 1);
  console.log(targetIn);

  const targetOut = tiket.filter((tiket) => tiket.targetIn === 0);
  console.log(targetOut);

  const rate = (targetIn.length / tiket.length) * 100;
  console.log(rate);

  const [value, setValue] = React.useState(new Date());

  const [value1, setValue1] = React.useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleChange1 = (newValue) => {
    setValue1(newValue);
  };

  const newJenisTiket = jenisTiket.slice(0, 5);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [pageSize, setPageSize] = React.useState(10);

  return (
    <Page title="ATM">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          ATM Section
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Start Date"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Start Date"
                    value={value1}
                    onChange={handleChange1}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={3} justifyContent="center">
                <Button
                  variant="outlined"
                  sx={{ height: '100%', minWidth:228, maxWidth:250 }}
                  onClick={() => {
                    axios
                      .get(
                        `http://localhost:3000/api/tiket/${moment(value).format('YYYY-MM-DD')}/${moment(value1).format(
                          'YYYY-MM-DD'
                        )}`
                      )
                      .then((response) => {
                        setTiket(response.data);
                        console.log(response.data);
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  }}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained" sx={{ height: '100%', width: '80%' }}>
                  Export PDF
                </Button>
              </Grid>

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

              <Grid item xs={12} sm={6} md={3}>
                <Percentage />
              </Grid>

              {/* <Grid item xs={6} sm={6} md={3}>
                <AppWidgetSummary
                  title="Rate Target"
                  total={rate.toFixed(2)}
                  percent="%"
                  color="secondary"
                  icon={'iconoir:percentage-round'}
                />
              </Grid> */}
            </Grid>
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
            <AppWebsiteVisits
              title="Current Closed Ticket"
              subheader="Departement ITE"
              chartLabels={minggu}
              chartData={[
                {
                  name: 'Tiket Selesai',
                  type: 'bar',
                  fill: 'solid',
                  data: total,
                },
                {
                  name: 'Sesuai Target',
                  type: 'bar',
                  fill: 'solid',
                  data: totalIn,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" sx={{ pl: 3, pt: 3, pb: 1 }}>
                  Performa Kantor Cabang
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
                      rows={listKanca}
                      columns={columns3}
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
                <DataGrid hideFooter="true" rows={listKanca} columns={columns3} pageSize={6} />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates
              title="Top 5 Jenis Masalah"
              subheader="ATM Section"
              chartData={newJenisTiket.map((item) => {
                const newItem = { label: item.nama, value: item.tiketClose };
                // console.log('jaja', newItem)
                return newItem;
              })}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" sx={{ pl: 3, pt: 3, pb: 1 }}>
                  Performa Implementor
                </Typography>
                <Box sx={{ pr: 5, pt: 3, pb: 1 }}>
                  <Link variant="body2" onClick={handleOpen} href="#">
                    Lihat Semua
                  </Link>
                </Box>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <DataGrid
                      rows={Implementor}
                      columns={columns2}
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
                  height: 430,
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
                <DataGrid hideFooter="true" rows={Implementor} columns={columns2} pageSize={6} />
              </Box>
            </Card>
          </Grid>

          {/* <Grid item xs={12} md={8}>
            <Statistics />
          </Grid>

          <Grid item xs={12} md={4}>
            <TableCard />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
