/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';

const validationSchema = yup.object({
  title: yup
    .string('Enter your Bio')
    .min(1, 'Password should be of minimum 250 characters length')
    .required('Name is required'),
  description: yup
    .string('Enter your description')
    .min(1, 'Password should be of minimum 250 characters length')
    .required('Email is required'),
  categories: yup
    .string('Enter your description')
    .min(1, 'Password should be of minimum 250 characters length')
    .required('Email is required'),
  seatStatus: yup
    .string('Enter your description')
    .min(1, 'Password should be of minimum 250 characters length')
    .required('Email is required'),
  // teacherProfileId: yup
  //   .string('Enter your description')
  //   .min(1, 'Password should be of minimum 250 characters length')
  //   .required('Email is required'),
  address: yup
    .string('Enter your description')
    .min(1, 'Password should be of minimum 250 characters length')
    .required('Email is required'),
  endDate: yup
    .date('Enter the end date of this course')
    .required('Email is required'),
});

const SignUp = () => {
  const [cookies, setCookie] = useCookies(['user']);
  const router = useRouter();
  // console.log('cookeise', cookies.data.user.id);
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      categories: '',
      seatStatus: '0',
      // teacherProfileId: cookies.data.user.id,
      address: '',
      endDate: new Date(),
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // const link = '';
        const newValue = {
          ...values,
          teacherProfileId: cookies.data.user.id,
          seatStatus: parseInt(values.seatStatus),
          newDate: new Date(values.endDate),
        };
        // values.push('teacherProfileId', cookies.data.user.id);
        console.log(newValue);

        const link = 'http://localhost:5000/course/coursepost';
        const user = await axios.post(link, newValue, {
          headers: {
            'content-type': 'application/json',
            Authorization: `token ${cookies.data.token}`,
          },
        });
        await router.push('/home');
      } catch (err) {
        console.log(err.message);
      }
    },
  });

  return (
    <CookiesProvider>
      <Container>
        <Box className="flex w-full justify-center">
          <form
            onSubmit={formik.handleSubmit}
            className="mt-7 max-w-md space-y-3"
          >
            <TextField
              fullWidth
              id="title"
              name="title"
              label="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />

            <TextField
              fullWidth
              id="description"
              name="description"
              label="description"
              type="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <TextField
              fullWidth
              id="seatStatus"
              name="seatStatus"
              label="seatStatus"
              type="seatStatus"
              value={formik.values.seatStatus}
              onChange={formik.handleChange}
              error={
                formik.touched.seatStatus && Boolean(formik.errors.seatStatus)
              }
              helperText={formik.touched.seatStatus && formik.errors.seatStatus}
            />

            <TextField
              fullWidth
              id="categories"
              name="categories"
              label="categories"
              type="categories"
              value={formik.values.categories}
              onChange={formik.handleChange}
              error={
                formik.touched.categories && Boolean(formik.errors.categories)
              }
              helperText={formik.touched.categories && formik.errors.categories}
            />
            {/* <TextField
              fullWidth
              id="teacherProfileId"
              name="teacherProfileId"
              label="teacherProfileId"
              type="teacherProfileId"
              value={formik.values.teacherProfileId}
              onChange={formik.handleChange}
              error={
                formik.touched.teacherProfileId &&
                Boolean(formik.errors.teacherProfileId)
              }
              helperText={
                formik.touched.categorteacherProfileIdies &&
                formik.errors.teacherProfileId
              }
            /> */}
            <TextField
              fullWidth
              id="address"
              name="address"
              label="address"
              type="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <label for="date">
              Enter a date and time for your party booking:
            </label>
            <input
              id="date"
              type="date"
              name="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              style={{ width: '100%', color: 'black' }}
            />

            <Button color="primary" variant="contained" type="submit" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </CookiesProvider>
  );
};

export default SignUp;
