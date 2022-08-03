import React, { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { clsx } from 'clsx';
// data
import TiketDataService from '../helper/services';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
  Percentage,
} from '../sections/@dashboard/app';

const columns = [
  { field: 'id', headerName: 'Kantor Cabang', flex: 2 },
  { field: 'total', headerName: 'Tiket Selesai', type: 'number', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'targetIn', headerName: 'Sesuai Target', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'targetOut', headerName: 'Keluar Target', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
  {
    field: 'rateTarget',
    headerName: 'Persentase',
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

export default function DashboardApp() {
  const theme = useTheme();
  const [tiketSelesai, setTiketSelesai] = useState([]);
  const [listTanggal, setListTanggal] = useState([]);
  const [listMinggu, setListMinggu] = useState([]);
  const [listKanca, setListKanca] = useState([]);
  const [bagian, setBagian] = useState([]);
  useEffect(() => {
    closedTicketLastWeek();
    perTanggal();
    perMinggu();
    performaKanca();
    perBagian();
  }, []);
  const closedTicketLastWeek = () => {
    TiketDataService.closedTicketLastWeek()
      .then((response) => {
        setTiketSelesai(response.data);
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
  const performaKanca = () => {
    TiketDataService.performaKanca()
      .then((response) => {
        setListKanca(response.data);
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

  const tanggal = listTanggal.map(({ tanggal }) => tanggal);
  // console.log(tanggal);
  const tiketClose = listTanggal.map(({ tiketClose }) => tiketClose);
  // console.log(tiketClose);
  const targetIn = listTanggal.map(({ targetIn }) => targetIn);
  const targetOut = listTanggal.map(({ targetOut }) => targetOut);

  const minggu = listMinggu.map(({ sampai }) => sampai);
  const atm = listMinggu.map(({ atm }) => atm);
  const crm = listMinggu.map(({ crm }) => crm);
  const edc = listMinggu.map(({ edc }) => edc);

  console.log(listKanca);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Selamat Datang!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={4}>
            <AppWidgetSummary
              title="Tiket Selesai"
              total={tiketSelesai.tiket_selesai}
              icon={'ant-design:file-done-outlined'}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={4}>
            <AppWidgetSummary
              title="Sesuai Target"
              total={tiketSelesai.targetIn}
              color="success"
              icon={'icon-park-solid:doc-success'}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={4 }>
            <AppWidgetSummary
              title="Keluar Target"
              total={tiketSelesai.targetOut}
              color="error"
              icon={'icon-park-solid:file-failed'}
            />
          </Grid>

          {/* <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary
              title="Rate Target"
              total={tiketSelesai.rate_target}
              percent="%"
              color="secondary"
              icon={'iconoir:percentage-round'}
            />
          </Grid> */}

          <Grid item xs={12} md={12}>
            <Percentage/>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Current Closed Ticket"
              subheader="Departement ITE"
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
            <AppConversionRates
              title="Performa Kantor Cabang"
              subheader="Implementor"
              chartData={listKanca.map((item) => {
                const newItem = { label: item.id, value: item.total };
                return newItem;
              })}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Card>
              <Box
                sx={{
                  height: 470,
                  padding: 1,
                  '& .super-app-theme--cell': {
                    backgroundColor: 'rgba(224, 183, 60, 0.55)',
                    color: '#1a3e72',
                    fontWeight: '600',
                  },
                  '& .super-app.negative': {
                    backgroundColor: '#d47483' ,
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
                <DataGrid
                  rows={listKanca}
                  columns={columns}
                  pageSize={6}
                  rowsPerPageOptions={[6]}
                  // sx={{
                  //   boxShadow: 2,
                  //   border: 2,
                  //   borderColor: 'primary.light',
                  //   '& .MuiDataGrid-cell:hover': {
                  //     color: 'primary.main',
                  //   },
                  // }}
                />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={bagian.map((item) => {
                const newItem = { label: item.bagian, value: item.tiket_close };
                return newItem;
              })}
              // chartColors={[
              //   theme.palette.primary.main,
              //   theme.palette.chart.blue[0],
              //   theme.palette.chart.violet[0],
              //   theme.palette.chart.yellow[0],
              // ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
