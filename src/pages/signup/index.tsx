/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Menu from '~/components/Menu';

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .min(3, 'Password should be of minimum 3 characters length')
    .required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  type: yup.string('Enter you type').required('Type is required'),
});

const SignUp = () => {
  const type = [
    { label: 'TEACHER', year: 1994 },
    { label: 'STUDENT', year: 1972 },
  ];

  const [cookies, setCookie] = useCookies(['user']);
  const [signUp, setsignUp] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      type: '',
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const user = await axios.post(
          'http://localhost:5000/users/signup',
          values,
        );

        setCookie('token', user.data.token, { path: '/', webDomain: '' });
        setCookie('data', user.data, { path: '/' });
        setsignUp(true);
        await router.push('/create-profile');
      } catch (err) {
        formik.setErrors({
          email: 'Sorry.. This email already exists',
        });

        console.log(err.message);
      }
      
    },
  });

  return (
    <CookiesProvider>
      <Menu />
      <Container>
        <Box className="flex w-full  justify-center">
          <form
            onSubmit={formik.handleSubmit}
            className=" mt-9 max-w-md space-y-3 rounded-xl bg-blue-100 p-8 font-semibold"
          >
            {/* <h1 className="w-full text-center text-3xl font-bold">Sign Up</h1> */}
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              placeholder='Ex: footbar'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              className="bg-white"
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              placeholder='Ex: footbar@gmail.com'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              className="bg-white"
            />

            <InputLabel id="demo-simple-select-label">
              Are you a teacher or student?
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="type"
              name="type"
              label="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
              className="min-w-[100px] bg-white"
            >
              <MenuItem value={'TEACHER'}>TEACHER</MenuItem>
              <MenuItem value={'STUDENT'}>STUDENT</MenuItem>
            </Select>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              placeholder='Ex: foot1234'
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              className="bg-white"
            />
            <Button color="primary" variant="contained" type="submit" fullWidth>
              Sign up
            </Button>
            {signUp && (
              <div className="m-1 p-5 text-green-700">
                You have successfully signed up
              </div>
            )}
          </form>
        </Box>
      </Container>
    </CookiesProvider>
  );
};

export default SignUp;
