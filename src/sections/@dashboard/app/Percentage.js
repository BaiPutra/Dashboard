import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, Typography, Stack, Divider } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
import { BaseOptionChart } from '../../../components/chart';

const CHART_SIZE = { width: '100%', height: 115 };

Percentage.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number,
};

export default function Percentage({ title, value }) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'sm');

  const chartOptionsCheckIn = merge(BaseOptionChart(), {
    chart: { sparkline: { enabled: true } },
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

  return (
    <Card sx={{ bgcolor: '#D1E9FC' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        divider={
          <Divider orientation={isDesktop ? 'vertical' : 'horizontal'} flexItem sx={{ borderStyle: 'dashed' }} />
        }
      >
        <Stack alignItems="center" justifyContent="center" sx={{ width: 1, py: 3 }}>
          <ReactApexChart type="radialBar" series={[value]} options={chartOptionsCheckIn} {...CHART_SIZE} />
          <Typography variant="body2" sx={{ opacity: 0.72 }}>
            {title}
          </Typography>
        </Stack>

      </Stack>
    </Card>
  );
}
