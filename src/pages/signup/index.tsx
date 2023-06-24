/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

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
  const formik = useFormik({
    initialValues: {
      name: 'name',
      email: 'foobar@example.com',
      password: 'foobar',
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
      } catch (err) {
        console.log(err.message);
      }
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit} className="mt-7 space-y-3">
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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
        >
          <MenuItem value={'TEACHER'}>TEACHER</MenuItem>
          <MenuItem value={'STUDENT'}>STUDENT</MenuItem>
        </Select>
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;
