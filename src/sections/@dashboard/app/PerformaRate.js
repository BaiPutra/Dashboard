import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, Typography, Stack, Divider } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
//
import { BaseOptionChart } from '../../../components/chart';

const CHART_SIZE = { width: 120, height: 135 };

export default function Percentage() {
  const [tiket, setTiket] = useState([]);
  const [thisMonth, setThisMonth] = useState([]);
  const [thisWeek, setThisWeek] = useState([]);
  const [yesterday, setYesterday] = useState([]);

  const todayDate = new Date();
  const today = todayDate.toISOString().slice(0, 10);
  todayDate.setDate(todayDate.getDate() - 1);
  const lastDay = todayDate.toISOString().slice(0, 10);
  todayDate.setDate(todayDate.getDate() - 6);
  const lastWeek = todayDate.toISOString().slice(0, 10);

  useEffect(() => {
    getAll();
    getThisMonth();
    getThisWeek();
    getYesterday();
  }, []);

  const getAll = () => {
    axios
      .get(
        `http://localhost:3001/api/tiket/'ATM','CRM','EDC'/2022-01-01/2022-${moment().format('MM')}-${moment().format(
          'DD'
        )}`
      )
      .then((response) => {
        setTiket(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getThisMonth = () => {
    axios
      .get(
        `http://localhost:3001/api/tiket/'ATM','CRM','EDC'/2022-${moment().format('MM')}-01/2022-${moment().format(
          'MM'
        )}-${moment().format('DD')}`
      )
      .then((response) => {
        setThisMonth(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getThisWeek = () => {
    axios
      .get(`http://localhost:3001/api/tiket/'ATM','CRM','EDC'/${lastWeek}/${today}`)
      .then((response) => {
        setThisWeek(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getYesterday = () => {
    axios
      .get(`http://localhost:3001/api/tiket/'ATM','CRM','EDC'/${lastDay}/${today}`)
      .then((response) => {
        setYesterday(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const TARGET_YEAR = tiket.filter((tiket) => tiket.targetIn === 1);
  const CHART_DATA_THIS_YEAR = tiket.length !== 0 ? (TARGET_YEAR.length / tiket.length) * 100 : 0;

  const TARGET_MONTH = thisMonth.filter((tiket) => tiket.targetIn === 1);
  const CHART_DATA_THIS_MONTH = thisMonth !== 0 ? (TARGET_MONTH.length / thisMonth.length) * 100 : 0;

  const TARGET_WEEK = thisWeek.filter((tiket) => tiket.targetIn === 1);
  const CHART_DATA_THIS_WEEK = thisWeek.length !== 0 ? (TARGET_WEEK.length / thisWeek.length) * 100 : 0;

  const TARGET_YESTERDAY = yesterday.filter((tiket) => tiket.targetIn === 1);
  const CHART_DATA_THIS_YESTERDAY = yesterday.length !== 0 ? (TARGET_YESTERDAY.length / yesterday.length) * 100 : 0;

  const theme = useTheme();

  const isDesktop = useResponsive('up', 'sm');

  const chartOptionsCheckIn = merge(BaseOptionChart(), {
    chart: { sparkline: { enabled: true } },
    grid: {
      padding: {
        top: -9,
        bottom: -9,
      },
    },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: '65%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            fontSize: theme.typography.subtitle2.fontSize,
          },
        },
      },
    },
  });

  return (
    <Card>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        divider={
          <Divider orientation={isDesktop ? 'vertical' : 'horizontal'} flexItem sx={{ borderStyle: 'dashed' }} />
        }
      >
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ width: 1, py: 3 }}>
          <ReactApexChart
            type="radialBar"
            series={[CHART_DATA_THIS_YESTERDAY.toFixed(2)]}
            options={chartOptionsCheckIn}
            {...CHART_SIZE}
          />
          <div>
            <Typography variant="h6" sx={{ mb: 0.2 }}>
              {yesterday.length} tiket
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>
              Performa Kemarin
            </Typography>
          </div>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ width: 1, py: 3 }}>
          <ReactApexChart
            type="radialBar"
            series={[CHART_DATA_THIS_WEEK.toFixed(2)]}
            options={chartOptionsCheckIn}
            {...CHART_SIZE}
          />
          <div>
            <Typography variant="h6" sx={{ mb: 0.2 }}>
              {thisWeek.length} tiket
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>
              Performa Minggu Ini
            </Typography>
          </div>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ width: 1, py: 3 }}>
          <ReactApexChart
            type="radialBar"
            series={[CHART_DATA_THIS_MONTH.toFixed(2)]}
            options={chartOptionsCheckIn}
            {...CHART_SIZE}
          />
          <div>
            <Typography variant="h6" sx={{ mb: 0.2 }}>
              {thisMonth.length} tiket
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>
              Performa Bulan Ini
            </Typography>
          </div>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ width: 1, py: 3 }}>
          <ReactApexChart
            type="radialBar"
            series={[CHART_DATA_THIS_YEAR.toFixed(2)]}
            options={chartOptionsCheckIn}
            {...CHART_SIZE}
          />
          <div>
            <Typography variant="h6" sx={{ mb: 0.2 }}>
              {tiket.length} tiket
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>
              Performa Tahun Ini
            </Typography>
          </div>
        </Stack>
      </Stack>
    </Card>
  );
}
