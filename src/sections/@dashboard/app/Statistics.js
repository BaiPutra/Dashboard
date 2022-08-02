import React, { useEffect, useState } from 'react';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Stack, Divider, CardHeader, Typography } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
//
import { BaseOptionChart } from '../../../components/chart';
import TiketDataService from '../../../helper/services';

const RootStyle = styled(Card)(({ theme }) => ({
    '& .apexcharts-legend': {
        width: 240,
        margin: 'auto',
        [theme.breakpoints.up('sm')]: {
            flexWrap: 'wrap',
            height: 160,
            width: '50%',
        },
    },
    '& .apexcharts-datalabels-group': {
        display: 'none',
    },
}));

export default function Statistics() {
    const [listData, setListData] = useState([])
    useEffect(() => {
        perJenisMasalah()
    }, [])
    const perJenisMasalah = () => {
        TiketDataService.perJenisMasalah()
            .then((response) => {
                setListData(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const theme = useTheme();

    const isDesktop = useResponsive('up', 'sm');
    // const CHART_DATA={listData.map((item) => {
    //     const newItem = { labels: item.id, data: item.tiketClose };
    //     return newItem;
    //   })}
    const id = listData.map(({ nama }) => nama);
    const total = listData.map(({ tiketClose }) => tiketClose);
    const CHART_DATA = {
        labels: id,
        data: total,
    };

    const chartOptions = merge(BaseOptionChart(), {
        labels: CHART_DATA.labels,
        colors: [
            theme.palette.primary.main,
            theme.palette.info.darker,
            theme.palette.chart.yellow[0],
            theme.palette.chart.blue[0],
            theme.palette.chart.red[0],
            theme.palette.chart.violet[2],
            theme.palette.chart.violet[0],
            theme.palette.success.darker,
            theme.palette.chart.green[0],
        ],
        stroke: {
            colors: [theme.palette.background.paper],
        },
        fill: { opacity: 0.8 },
        legend: {
            position: 'right',
            itemMargin: {
                horizontal: 10,
                vertical: 5,
            },
        },
        responsive: [
            {
                breakpoint: theme.breakpoints.values.sm,
                options: {
                    legend: {
                        position: 'bottom',
                        horizontalAlign: 'left',
                    },
                },
            },
        ],
    });

    return (
        <RootStyle>
            <CardHeader title="Expenses Categories" />

            <Box sx={{ my: 5 }} dir="ltr">
                <ReactApexChart
                    type="polarArea"
                    series={CHART_DATA.data}
                    options={chartOptions}
                    height={isDesktop ? 240 : 360}
                />
            </Box>

            <Divider />

            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
                <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
                    <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>Categories</Typography>
                    <Typography sx={{ typography: 'h4' }}>9</Typography>
                </Box>

                <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
                    <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>Categories</Typography>
                    <Typography sx={{ typography: 'h4' }}>$18,765</Typography>
                </Box>
            </Stack>
        </RootStyle>
    );
}
