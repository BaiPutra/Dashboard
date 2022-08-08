import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, Typography, Stack, Divider } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../components/chart';

const CHART_SIZE = { width: 150, height: 145 };

const TOTAL_CHECK_IN = 38566;
const TOTAL_CHECK_OUT = 18472;
const CHART_DATA_CHECK_IN = [80.10];
const CHART_DATA_CHECK_OUT = [64];

export default function Percentage() {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'sm');

  const chartOptionsCheckIn = merge(BaseOptionChart(), {
    chart: { sparkline: { enabled: true } },
    // grid: {
    //   padding: {
    //     top: -2,
    //     bottom: -2,
    //   },
    // },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: '58%' },
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

  const chartOptionsCheckOut = {
    ...chartOptionsCheckIn,
    colors: [theme.palette.chart.yellow[0]],
  };

  return (
    <Card sx={{ bgcolor: '#D1E9FC' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        divider={
          <Divider orientation={isDesktop ? 'vertical' : 'horizontal'} flexItem sx={{ borderStyle: 'dashed' }} />
        }
      >
        <Stack alignItems="center" justifyContent="center" sx={{ width: 1, py: 3 }}>
          <ReactApexChart type="radialBar" series={CHART_DATA_CHECK_IN} options={chartOptionsCheckIn} {...CHART_SIZE} />
          {/* <Typography variant="h4" sx={{ mb: 0.5 }}>
              {fNumber(TOTAL_CHECK_IN)}
            </Typography> */}
          <Typography variant="body2" sx={{ opacity: 0.72 }}>
            Persentase
          </Typography>
        </Stack>

        {/* <Stack direction="row" alignItems="center" justifyContent="center" spacing={3} sx={{ width: 1, py: 5 }}>
          <ReactApexChart
            type="radialBar"
            series={CHART_DATA_CHECK_OUT}
            options={chartOptionsCheckOut}
            {...CHART_SIZE}
          />
          <div>
            <Typography variant="h4" sx={{ mb: 0.5 }}>
              {fNumber(TOTAL_CHECK_OUT)}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.72 }}>
              Check Out
            </Typography>
          </div>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="center" spacing={3} sx={{ width: 1, py: 5 }}>
          <ReactApexChart
            type="radialBar"
            series={CHART_DATA_CHECK_OUT}
            options={chartOptionsCheckOut}
            {...CHART_SIZE}
          />
          <div>
            <Typography variant="h4" sx={{ mb: 0.5 }}>
              {fNumber(TOTAL_CHECK_OUT)}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.72 }}>
              Check Out
            </Typography>
          </div>
        </Stack> */}
      </Stack>
    </Card>
  );
}
