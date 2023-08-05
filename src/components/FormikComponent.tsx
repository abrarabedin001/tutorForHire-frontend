/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { CookiesProvider } from 'react-cookie';
import { useRouter } from 'next/router';
import Textarea from '@mui/joy/Textarea';
import axios from 'axios';
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';

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
  address: yup
    .string('Enter your description')
    .min(1, 'Password should be of minimum 250 characters length')
    .required('Email is required'),
  endDate: yup
    .date('Enter the end date of this course')
    .required('Email is required'),
});

const FormikComponent = ({
  slug,
  title,
  description,
  categories,
  seatStatus,
  address,
  startDate,
  endDate,
  cookies,
  classes,
}: {
  slug: string;
  title: string;
  description: string;
  categories: string;
  seatStatus: number;
  address: string;
  startDate: Date;
  endDate: Date;
  cookies: Date;
  classes?: string;
}) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: title || 'something',
      description: description,
      categories: categories,
      seatStatus: seatStatus,
      // teacherProfileId: cookies.data.user.id,
      address: address,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
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

        const link = 'http://localhost:5000/course/courseupdate/' + slug;
        const { data } = cookies;
        console.log('link', link);
        console.log(data);
        const user = await axios.patch(link, newValue, {
          headers: {
            'content-type': 'application/json',
            Authorization: `token ${cookies.data.token}`,
          },
        });
        await router.push('/course/personal/' + slug);
      } catch (err) {
        console.log(err.message);
      }
    },
  });

  return (
    <CookiesProvider>
      <Box className={classes}>
        <form
          onSubmit={formik.handleSubmit}
          className="mb-32 mt-9 w-[400px] max-w-md space-y-3 rounded-xl bg-blue-100 p-8 "
        >
          <h1 className="text-center text-2xl font-bold">Edit Course</h1>
          <p className=" text-lg font-semibold">Title: </p>
          <Textarea
            fullWidth
            id="title"
            name="title"
            label={formik.values.title}
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            className="bg-white"
          />

          <p className=" text-lg font-semibold">Description: </p>

          <Textarea
            fullWidth
            id="description"
            name="description"
            label="description"
            type="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="bg-white"
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />

          <p className=" text-lg font-semibold">Seat Status: </p>
          <Textarea
            fullWidth
            id="seatStatus"
            name="seatStatus"
            label="seatStatus"
            type="seatStatus"
            value={formik.values.seatStatus}
            className="bg-white"
            onChange={formik.handleChange}
            error={
              formik.touched.seatStatus && Boolean(formik.errors.seatStatus)
            }
            helperText={formik.touched.seatStatus && formik.errors.seatStatus}
          />
          <p className=" text-lg font-semibold">Categories: </p>
          <Textarea
            fullWidth
            id="categories"
            name="categories"
            label="categories"
            type="categories"
            value={formik.values.categories}
            className="bg-white"
            onChange={formik.handleChange}
            error={
              formik.touched.categories && Boolean(formik.errors.categories)
            }
            helperText={formik.touched.categories && formik.errors.categories}
          />

          <p className=" text-lg font-semibold">Address: </p>
          <Textarea
            fullWidth
            id="address"
            name="address"
            label="address"
            type="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            className="bg-white"
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <p className=" p-1 text-lg font-semibold" for="date">
            Enter start date
          </p>
          <input
            id="date"
            type="date"
            name="startDate"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            className="rounded bg-white p-3"
            style={{ width: '100%', color: 'black' }}
          />
          <p className=" p-1 text-lg font-semibold" for="date">
            Enter end date
          </p>
          <input
            id="date"
            type="date"
            name="endDate"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            className="rounded bg-white p-3"
            style={{ width: '100%', color: 'black' }}
          />

          <Button color="primary" variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </CookiesProvider>
  );
};

export default FormikComponent;
