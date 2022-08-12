import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, Box, Stack, TextField, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DataGrid } from '@mui/x-data-grid';

import { clsx } from 'clsx';
import TiketDataService from '../helper/services';
// components
import Page from '../components/Page';
// sections
import {
  AppWidgetSummary,
  AppWebsiteVisits,
  AppConversionRates,
  Percentage,
  PerformaTable,
  AppCurrentVisits
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
        negative: params.value < 95,
        positive: params.value > 95,
      });
    },
  },
];

export default function EDC() {
  const theme = useTheme();
  const bagian = `'EDC'`;

  const [tiket, setTiket] = useState([]);
  const [listTanggal, setListTanggal] = useState([]);
  const [listMinggu, setListMinggu] = useState([]);
  const [listKanca, setListKanca] = useState([]);
  const [Implementor, setImplementor] = useState([]);
  const [jenisTiket, setJenisTiket] = useState([]);

  useEffect(() => {
    getAll(bagian);
    perTanggal(bagian);
    performaKanca(bagian);
    performaImplementor(bagian);
    perJenisMasalah(bagian);
    perMinggu();
  }, [bagian]);

  const getAll = bagian => {
    TiketDataService.getAll(bagian)
      .then((response) => {
        setTiket(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const perTanggal = bagian => {
    TiketDataService.perTanggal(bagian)
      .then((response) => {
        setListTanggal(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const performaKanca = bagian => {
    TiketDataService.performaKanca(bagian)
      .then((response) => {
        setListKanca(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const performaImplementor = bagian => {
    TiketDataService.performaImplementor(bagian)
      .then((response) => {
        setImplementor(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const perJenisMasalah = bagian => {
    TiketDataService.perJenisMasalah(bagian)
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
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const minggu = listMinggu.map(({ sampai }) => sampai);
  const total = listMinggu.map(({ edc }) => edc);
  const totalIn = listMinggu.map(({ targetInEDC }) => targetInEDC);

  const targetIn = tiket.filter((tiket) => tiket.targetIn === 1);
  const targetOut = tiket.filter((tiket) => tiket.targetIn === 0);
  const rate = (targetIn.length / tiket.length) * 100;

  const d = new Date();

  const [value, setValue] = React.useState(d.setDate(1));
  const [value1, setValue1] = React.useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleChange1 = (newValue) => {
    setValue1(newValue);
  };

  const [startMonth, setStartMonth] = React.useState(d.setDate(1));
  const [endMonth, setEndMonth] = React.useState(new Date());

  const [startMonth1, setStartMonth1] = React.useState(d.setDate(1));
  const [endMonth1, setEndMonth1] = React.useState(new Date());

  const handleChange2 = (newValue) => {
    setStartMonth(newValue);
    // console.log(startMonth);
  };

  const handleChange3 = (newValue1) => {
    const lastDay = new Date(newValue1.getFullYear(), newValue1.getMonth() + 1, 0);
    setEndMonth(lastDay);
    // console.log(endMonth);
  };

  const handleChange4 = (newValue) => {
    setStartMonth1(newValue);
    // console.log(startMonth);
  };

  const handleChange5 = (newValue1) => {
    const lastDay = new Date(newValue1.getFullYear(), newValue1.getMonth() + 1, 0);
    setEndMonth1(lastDay);
    // console.log(endMonth);
  };

  const handleSubmit = () => {
    axios
      .get(
        `http://localhost:3001/api/tiket/performaKanca/${bagian}/${moment(startMonth).format('YYYY-MM-DD')}/${moment(
          endMonth
        ).format('YYYY-MM-DD')}`
      )
      .then((response) => {
        setListKanca(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        // console.log(e);
      });
      console.log(startMonth, endMonth);
  }

  const handleSubmit1 = () => {
    axios
      .get(
        `http://localhost:3001/api/tiket/performaKanca/${bagian}/${moment(startMonth).format('YYYY-MM-DD')}/${moment(
          endMonth
        ).format('YYYY-MM-DD')}`
      )
      .then((response) => {
        setImplementor(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        // console.log(e);
      });
      console.log(startMonth, endMonth);
  }

  const newJenisTiket = jenisTiket.slice(0, 5);

  return (
    <Page title="EDC">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          EDC Section
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={value}
                maxDate={value1}
                onChange={handleChange}
                renderInput={(params) => <TextField size='small' {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                value={value1}
                minDate={value}
                maxDate={new Date()}
                onChange={handleChange1}
                renderInput={(params) => <TextField size='small' {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={2} justifyContent="center">
            <Button
              variant="outlined"
              sx={{ height: '100%', width: '100%' }}
              onClick={() => {
                axios
                  .get(
                    `http://localhost:3001/api/tiket/${bagian}/${moment(value).format('YYYY-MM-DD')}/${moment(value1).format(
                      'YYYY-MM-DD'
                    )}`
                  )
                  .then((response) => {
                    setTiket(response.data);
                    // console.log(response.data);
                  })
                  .catch((e) => {
                    // console.log(e);
                  });
              }}
            >
              Submit
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Grid container justifyContent="flex-end" alignItems="stretch">
              <Button variant="contained" sx={{ width: '30%', height: 40 }}>
                Export PDF
              </Button>
            </Grid>
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
            <Percentage
              title='Persentase'
              value={rate.toFixed(1)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Card>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" sx={{ pl: 3, pt: 3, pb: 1 }}>
                  Ticket Handle Last Week
                </Typography>
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
                    fontWeight: '600',
                  },
                  '& .super-app.in': {
                    color: '#2e7d32',
                    fontWeight: '800',
                  },
                  '& .super-app.out': {
                    color: '#d32f2f',
                    fontWeight: '800',
                  },
                }}
              >
                <DataGrid hideFooter rows={listTanggal} columns={columns} density='compact' sx={{ p: 1 }} />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppWebsiteVisits
              title="Tiket Selesai Per Minggu"
              subheader="EDC Section"
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
            <PerformaTable
              header='Kantor Cabang'
              title='Performa Kantor Cabang'
              rows={listKanca}
              value={startMonth}
              value1={endMonth}
              handleChange={handleChange2}
              handleChange1={handleChange3}
              submit={handleSubmit}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates
              title="Top 5 Jenis Masalah Bulan Ini"
              subheader="EDC Section"
              chartData={newJenisTiket.map((item) => {
                const newItem = { label: item.nama, value: item.tiketClose };
                return newItem;
              })}
              header='Jenis Masalah'
              rows={jenisTiket}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <PerformaTable
              header='Implementor'
              title='Performa Implementor'
              rows={Implementor}
              value={startMonth1}
              value1={endMonth1}
              handleChange={handleChange4}
              handleChange1={handleChange5}
              submit={handleSubmit1}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
