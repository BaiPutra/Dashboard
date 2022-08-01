import React, { useEffect, useState } from 'react';
// @mui
import { Grid, Container, Typography, Card, Box, Button, Modal } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { clsx } from 'clsx';
// data
import TiketDataService from '../helper/services';
// components
import Page from '../components/Page';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';

const columns = [
  { field: 'id', headerName: 'Tanggal', width: 240 },
  { field: 'tiketClose', headerName: 'Tiket Selesai', type: 'number', width: 220 },
  { field: 'targetIn', headerName: 'Sesuai Target', type: 'number', width: 220 },
  { field: 'targetOut', headerName: 'Keluar Target', type: 'number', width: 220 },
  {
    field: 'rateTarget',
    headerName: 'Persentase',
    type: 'number',
    width: 220,
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

const columns2 = [
  { field: 'id', headerName: 'Jenis Masalah', width: 230 },
  { field: 'tiketClose', headerName: 'Tiket Selesai', type: 'number', width: 110 },
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

const columns3 = [
  { field: 'id', headerName: 'Kantor Cabang', width: 230 },
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

const style = {
  height: 480,
  padding: 1,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 760,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ATM() {
  const [tiketSelesai, setTiketSelesai] = useState([]);
  const [listTanggal, setListTanggal] = useState([]);
  const [listMinggu, setListMinggu] = useState([]);
  const [listKanca, setListKanca] = useState([]);
  const [jenisTiket, setJenisTiket] = useState([]);
  const [bagian, setBagian] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    closedTicketLastWeek();
    perTanggal();
    perMinggu();
    performaKanca();
    perJenisMasalah();
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
  const perJenisMasalah = () => {
    TiketDataService.perJenisMasalah()
      .then((response) => {
        setJenisTiket(response.data);
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

  const minggu = listMinggu.map(({ sampai }) => sampai);
  const atm = listMinggu.map(({ atm }) => atm);
  const crm = listMinggu.map(({ crm }) => crm);
  const edc = listMinggu.map(({ edc }) => edc);

  console.log(listKanca);

  return (
    <Page title="ATM">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          ATM Section
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary
              title="Tiket Selesai"
              onClick={handleOpen}
              total={tiketSelesai.tiket_selesai}
              icon={'ant-design:file-done-outlined'}
            />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <DataGrid rows={jenisTiket} columns={columns2} pageSize={6} rowsPerPageOptions={[6]} />
              </Box>
            </Modal>
            {/* <Button onClick={handleOpen}>Details</Button> */}
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary
              title="Sesuai Target"
              total={tiketSelesai.targetIn}
              color="success"
              icon={'icon-park-solid:doc-success'}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary
              title="Keluar Target"
              total={tiketSelesai.targetOut}
              color="error"
              icon={'icon-park-solid:file-failed'}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary
              title="Rate Target"
              total={tiketSelesai.rate_target}
              percent="%"
              color="secondary"
              icon={'iconoir:percentage-round'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <Card>
              <Box
                sx={{
                  height: 340,
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
        </Grid>
      </Container>
    </Page>
  );
}
