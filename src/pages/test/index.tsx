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
import UploadFile from '~/components/UploadFile';

import Menu from '~/components/Menu';
import { Textarea } from '@mui/joy';

const validationSchema = yup.object({
  bio: yup
    .string('Enter your Bio')
    .min(5, 'Minimum 5 characters')
    .required('Name is required'),
  education: yup
    .string('Enter your education')
    .min(5, 'Minimum 5 characters')
    .required('Email is required'),
  Phone: yup
    .number()
    .typeError('Phone must be a number')
    .min(10, 'Minimum 10 characters including zero')
    .required('Phone no. is required'),
  fileUpload: yup
    .mixed<FileList>() // Pass in the type of `fileUpload`
    .test(
      'fileSize',
      'Only documents up to 2MB are permitted.',
      (files) =>
        !files || // Check if `files` is defined
        files.length === 0 || // Check if `files` is not an empty list
        Array.from(files).every((file) => file.size <= 2_000_000),
    ),
});

const SignUp = () => {
  const [cookies, setCookie] = useCookies(['user']);
  const router = useRouter();
  console.log('cookeise', cookies.Name);
  const MAX_SIZE = 500000; // 500KB
  const validateImage = (values: { image?: File }) => {
    if (values.image && values.image.size > MAX_SIZE) {
      return { image: 'Max file size exceeded.' };
    }
  };

  // const formik = useFormik<{ image?: File }>({
  //   initialValues: {}, // formik hook would include entire partner config
  //   onSubmit: (values) => console.log(values), // make request to service(s)
  //   validate: validateImage, // validate file type, size, etc.
  // });
  const formik = useFormik({
    initialValues: {
      bio: '',
      education: '',
      Phone: '',
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('values', values);
      console.log(values);
      try {
        let link = '';

        if (cookies.data.user.type === 'STUDENT') {
          link = 'http://localhost:5000/student/create';
        } else {
          link = 'http://localhost:5000/tutor/tutorcreate2';
        }
        const user = await axios.post(link, values, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `token ${cookies.data.token}`,
          },
        });
        // await router.push('/home');
      } catch (err) {
        formik.setErrors({
          bio: 'Before creating a profile, please sign up',
          education: 'Before creating a profile, please sign up',
          Phone: 'Before creating a profile, please sign up',
        });
        console.log(err.message);
      }
    },
  });

  return (
    <CookiesProvider>
      <Menu />
      <Container>
        <Box className="flex w-full justify-center">
          <form
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
            className=" mt-9 max-w-md space-y-3 rounded-xl bg-blue-100 p-8 font-semibold"
          >
            <p>Subjects</p>
            <TextField
              fullWidth
              id="bio"
              name="bio"
              label="subjects"
              multiline // Set the multiline prop to true to make it behave like a textarea
              minRows={1}
              maxRows={4} // Optionally, set the number of rows for the textarea
              value={formik.values.bio}
              onChange={formik.handleChange}
              error={formik.touched.bio && Boolean(formik.errors.bio)}
              helperText={formik.touched.bio && formik.errors.bio}
            />
            <p>Education</p>
            <TextField
              fullWidth
              id="education"
              name="education"
              label="Education"
              multiline // Set the multiline prop to true to make it behave like a textarea
              minRows={1}
              maxRows={4} // Optionally, set the number of rows for the textarea
              value={formik.values.education}
              onChange={formik.handleChange}
              error={
                formik.touched.education && Boolean(formik.errors.education)
              }
              helperText={formik.touched.education && formik.errors.education}
            />
            <p>Phone-no</p>
            <TextField
              fullWidth
              id="Phone"
              name="Phone"
              label="Phone-no"
              multiline // Set the multiline prop to true to make it behave like a textarea
              minRows={1}
              maxRows={4} // Optionally, set the number of rows for the textarea
              value={formik.values.Phone}
              onChange={formik.handleChange}
              error={formik.touched.Phone && Boolean(formik.errors.Phone)}
              helperText={formik.touched.Phone && formik.errors.Phone}
            />
            <UploadFile
              data={formik.values}
              errors={formik.errors}
              setFieldValue={formik.setFieldValue}
            />
            {/* <button
              onClick={() => formik.handleSubmit()}
              disabled={!formik.isValid || (formik.values.image ? false : true)}
            >
              submit
            </button> */}
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
