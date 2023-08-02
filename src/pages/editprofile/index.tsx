/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { use } from 'react';

import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Footer from '~/components/Footer';

import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

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
    .positive('Phone no. must be a positive number')
    .required('Phone no. is required')
});

const SignUp = () => {
  const [cookies, setCookie] = useCookies(['user']);
  const [bio, setBio] = React.useState('');
  const [education, setEducation] = React.useState('');
  const [Phone,setPhone] = React.useState('');

  React.useEffect(() => {
    const getStuff = async () => {
      try {
        let link = '';

        if (cookies.data.user.type === 'STUDENT') {
          link = 'http://localhost:5000/student/getprofile';
        } else {
          link = 'http://localhost:5000/tutor/getprofile';
        }
        const profile = await axios.get(
          link,

          {
            headers: {
              'content-type': 'application/json',
              Authorization: `token ${cookies.data.token}`,
            },
          },
        );
        console.log('profile', profile.data);
        setBio(profile.data.data.bio);
        setEducation(profile.data.data.education);
        setPhone(profile.data.data.Phone);
        // await router.push('/home');
      } catch (err) {
        console.log(err.message);
      }
    };
    getStuff();
  }, []);
  const router = useRouter();
  console.log('cookeise', cookies.Name);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      let link = '';

      if (cookies.data.user.type === 'STUDENT') {
        link = 'http://localhost:5000/student/studentupdate';
      } else {
        link = 'http://localhost:5000/tutor/tutorupdate';
      }
      const user = await axios.patch(
        link,
        { bio: bio, education: education,Phone:Phone },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `token ${cookies.data.token}`,
          },
        },
      );
      // await router.push('/home');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Menu />
      <Container>
        <Box className="mb-20 flex w-full justify-center">
          <form
            onSubmit={(e) => {
              submitForm(e);
            }}
            className="mt-9 max-w-md space-y-3 rounded-xl bg-blue-100 p-8 "
          >
            <h1 className="text-center text-2xl font-bold">Edit Course</h1>
            <p className=" text-lg font-semibold">Subjects: </p>
            <TextField
              fullWidth
              id="bio"
              name="bio"
              label="subjects"
              multiline
              minRows={1} // Limiting to 2 rows
              maxRows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-white"
            />

            <p className=" text-lg font-semibold">Education: </p>

            <TextField
              fullWidth
              id="education"
              name="education"
              label="education"
              multiline
              minRows={1} // Limiting to 2 rows
              maxRows={4}
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="bg-white"
            />

          <p className=" text-lg font-semibold">Phone-no: </p>

          <TextField
            fullWidth
            id="Phone"
            name="Phone"
            label="Phone-no"
            multiline
            maxRows={1}
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-white"
/>
            <Button color="primary" variant="contained" type="submit" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default SignUp;
