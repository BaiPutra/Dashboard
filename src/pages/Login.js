import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IconButton, InputAdornment, Button, TextField, Box, Typography, Container, Grid, Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import Iconify from '../components/Iconify';
import Page from '../components/Page';
// import Logo from '../components/Logo';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post('http://localhost:3001/api/tiket/login', {
        username: data.get('username'),
        password: data.get('password'),
      })
      .then((response) => {
        console.log('Status: ', response.status);
        console.log('Data: ', response.data[0]);

        if (response.data.length > 0) {
          localStorage.setItem('USER', JSON.stringify(response.data[0]));
          console.log('hihi', response.data[0].role);
          if (response.data[0].role === 'staff') {
            navigate('/dashboard/app');
          } else if (response.data[0].role === 'supervisor_atm') {
            navigate('/dashboard/atm');
          } else {
            navigate('/dashboard/edc');
          }
        } else {
          setAlertContent('Data yang dimasukkan salah');
          setAlert(true)
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <Page title="Login">
      <Container maxWidth="sm">
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" gutterBottom>
              Dashboard Departement ITE
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Silakan Login Terlebih Dahulu</Typography>
          </Box>
          {/* <Logo /> */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mb: 5, width: 500 }}>
            {/* <Typography sx={{ color: 'text.secondary' }}>Silakan Login Terlebih Dahulu</Typography> */}
            {alert ? <Alert severity='error'>{alertContent}</Alert> : <></>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              // autoComplete="username"
              // autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton id="loginBtn" type="submit" fullWidth size="large" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </LoadingButton>
          </Box>
        </ContentStyle>
      </Container>
    </Page>
  );
}
