import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  // const {
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = methods;

  const handleSubmit = () => {
    fetch('http://localhost:3001/api/tiket/perMinggu', {
      headers: {},
      method: 'GET'
    }).then(res => console.log(res))
    console.log('TESTETESSS');

    // navigate('/dashboard', { replace: true });
    // console.log('eewewwwdwdwd', e.target.email.value);
    // const data = new FormData();
    // data.append("username", 'baiputra');
    // data.append("password", "password");
    // console.log(data);

    // const data = JSON.stringify({
    //   username: 'baiputra',
    //   password: 'password',
    // });
    // const config = {
    //   method: 'post',
    //   url: 'http://localhost:3001/api/tiket/login',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   data,
    // };
    // console.log(config);
    // try {
    //   axios(config)
    //     .then((response) => {
    //       console.log('Hehehee', JSON.stringify(response.data));
    //     })
    //     .catch(console.error);
    // } catch {
    //   console.log('daffff');
    // }

    // axios({
    //   method: 'post',
    //   url: 'http://localhost:3001/api/tiket/login',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: JSON.stringify({
    //     "username": "baiputra",
    //     "password": "password"
    //   })
    // }).then(data => console.log(data))
    // axios
    //   .post('http://localhost:3001/api/tiket/login', data)
    //   .then((response) => {
    //     console.log('Status: ', response.status);
    //     console.log('Data: ', response.data);
    //     // localStorage.setItem('USER_BRI', res.data)
    //     // navigate('/dashboard');
    //   })
    //   .catch(error => {
    //     console.log('error', error);
    //   });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <Button fullWidth size="large" type="submit" variant="contained">
        Login
      </Button>
    </FormProvider>
  );
}
