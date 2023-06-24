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

const validationSchema = yup.object({
  bio: yup
    .string('Enter your Bio')
    .min(10, 'Password should be of minimum 250 characters length')
    .required('Name is required'),
  education: yup
    .string('Enter your education')
    .min(10, 'Password should be of minimum 250 characters length')
    .required('Email is required'),
});

const SignUp = () => {
  const [cookies, setCookie] = useCookies(['user']);
  const router = useRouter();
  console.log('cookeise', cookies.Name);
  const formik = useFormik({
    initialValues: {
      bio: '',
      education: '',
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        let link = '';

        if (cookies.data.user.type === 'STUDENT') {
          link = 'http://localhost:5000/student/create';
        } else {
          link = 'http://localhost:5000/tutor/tutorcreate';
        }
        const user = await axios.post(link, values, {
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
              id="bio"
              name="bio"
              label="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              error={formik.touched.bio && Boolean(formik.errors.bio)}
              helperText={formik.touched.bio && formik.errors.bio}
            />

            <TextField
              fullWidth
              id="education"
              name="education"
              label="education"
              type="education"
              value={formik.values.education}
              onChange={formik.handleChange}
              error={
                formik.touched.education && Boolean(formik.errors.education)
              }
              helperText={formik.touched.education && formik.errors.education}
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
