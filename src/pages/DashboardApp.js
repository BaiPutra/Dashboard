import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, TextField, Button } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { clsx } from 'clsx';
// data
import TiketDataService from '../helper/services';
// components
import Page from '../components/Page';
// sections
import { AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary, PerformaRate, AppConversionRates } from '../sections/@dashboard/app';

export default function DashboardApp() {
  const theme = useTheme();
  const [tiket, setTiket] = useState([]);
  const [listMinggu, setListMinggu] = useState([]);
  const [listKanca, setListKanca] = useState([]);
  const [bagian, setBagian] = useState([]);
  const [implementor, setImplementor] = useState([]);

  useEffect(() => {
    perMinggu();
    performaKanca();
    perBagian();
    getTiket();
    performaImplementor();
  }, []);

  const getTiket = () => {
    axios
      .get(
        `http://localhost:3001/api/tiket/'ATM','CRM','EDC'/2022-${moment().format('MM')}-01/2022-${moment().format(
          'MM'
        )}-${moment().format('DD')}`
      )
      .then((response) => {
        setTiket(response.data);
        console.log(response.data);
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
  const perBagian = () => {
    TiketDataService.perBagian()
      .then((response) => {
        setBagian(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const performaKanca = () => {
    axios
      .get(
        `http://localhost:3001/api/tiket/performaKanca/'ATM','CRM','EDC'/2022-${moment().format(
          'MM'
        )}-01/2022-${moment().format('MM')}-${moment().format('DD')}`
      )
      .then((response) => {
        setListKanca(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const performaImplementor = () => {
    axios
      .get(
        `http://localhost:3001/api/tiket/performaImplementor/'ATM','CRM','EDC'/2022-${moment().format(
          'MM'
        )}-01/2022-${moment().format('MM')}-${moment().format('DD')}`
      )
      .then((response) => {
        setImplementor(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const minggu = listMinggu.map(({ sampai }) => sampai);
  const atm = listMinggu.map(({ atm }) => atm);
  const crm = listMinggu.map(({ crm }) => crm);
  const edc = listMinggu.map(({ edc }) => edc);

  const newListKanca = listKanca.slice(0, 5);
  const newImplementor = implementor.slice(0, 5);

  const [value, setValue] = React.useState(new Date().setDate(1));
  const [value1, setValue1] = React.useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleChange1 = (newValue) => {
    setValue1(newValue);
  };

  const targetIn = tiket.filter((tiket) => tiket.targetIn === 1);
  const targetOut = tiket.filter((tiket) => tiket.targetIn === 0);

  const user = localStorage.getItem('USER');
  const parsedUser = JSON.parse(user);
  
  if (parsedUser.role === 'staff') {
    return (
      <Page title="Dashboard">
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ pb: 0.5 }}>
            Kinerja Departemen ITE 2022
          </Typography>
          <Typography sx={{ mb: 4 }}>Tiket ATM, CRM, dan EDC</Typography>

          <Grid container spacing={3}>
            <Grid item xs={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  id="startDate"
                  label="Start Date"
                  value={value}
                  maxDate={value1}
                  onChange={handleChange}
                  renderInput={(params) => <TextField size="small" {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  id="endDate"
                  label="End Date"
                  value={value1}
                  minDate={value}
                  maxDate={new Date()}
                  onChange={handleChange1}
                  renderInput={(params) => <TextField size="small" {...params} />}
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
                      `http://localhost:3001/api/tiket/'ATM','CRM','EDC'/${moment(value).format('YYYY-MM-DD')}/${moment(
                        value1
                      ).format('YYYY-MM-DD')}`
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
                Filter
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Grid container justifyContent="flex-end" alignItems="stretch">
                <Button variant="contained" sx={{ width: '30%', height: 40 }}>
                  Export PDF
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={6} sm={6} md={4}>
              <AppWidgetSummary
                title="Tiket Selesai"
                total={tiket.length}
                icon={'ant-design:file-done-outlined'}
                rows={tiket}
              />
            </Grid>

            <Grid item xs={6} sm={6} md={4}>
              <AppWidgetSummary
                title="Tiket Sesuai Target"
                total={targetIn.length}
                color="success"
                icon={'icon-park-solid:doc-success'}
                rows={targetIn}
              />
            </Grid>

            <Grid item xs={6} sm={6} md={4}>
              <AppWidgetSummary
                title="Tiket Keluar Target"
                total={targetOut.length}
                color="error"
                icon={'icon-park-solid:file-failed'}
                rows={targetOut}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <PerformaRate />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits
                title="Grafik Penyelesaian Tiket"
                subheader="Dalam Rentang Waktu Per Minggu"
                chartLabels={minggu}
                chartData={[
                  {
                    name: 'EDC',
                    type: 'area',
                    fill: 'gradient',
                    data: edc,
                  },
                  {
                    name: 'ATM',
                    type: 'area',
                    fill: 'gradient',
                    data: atm,
                  },
                  {
                    name: 'CRM',
                    type: 'area',
                    fill: 'gradient',
                    data: crm,
                  },
                ]}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits
                title="Persentase Tiket Departemen ITE"
                subheader="Per Bagian (Agustus 2022)"
                chartData={bagian.map((item) => {
                  const newItem = { label: item.bagian, value: item.tiket_close };
                  return newItem;
                })}
                chartColors={[theme.palette.primary.main, theme.palette.chart.blue[0], theme.palette.chart.yellow[0]]}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <AppConversionRates
                title="Performa Kantor Cabang"
                subheader="Departemen ITE (Agustus 2022)"
                chartData={newListKanca.map((item) => {
                  const newItem = { label: item.nama, value: item.total };
                  return newItem;
                })}
                header="Kantor Cabang"
                rows={listKanca}
                color="#26a69a"
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <AppConversionRates
                title="Performa Implementor"
                subheader="Departemen ITE (Agustus 2022)"
                chartData={newImplementor.map((item) => {
                  const newItem = { label: item.nama, value: item.total };
                  return newItem;
                })}
                header="Implementor"
                rows={implementor}
                color="#5c6bc0"
              />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  }
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Grid
          container
          display="flex"
          direction="column"
          alignItems="center"
          justifyContent="space-evenly"
          style={{ minHeight: '100vh' }}
        >
          <Typography variant="h4" sx={{ pb: 15 }}>
            Anda tidak memiliki akses pada halaman ini!
          </Typography>
        </Grid>
      </Container>
    </Page>
  );
}
