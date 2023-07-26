/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { use } from 'react';

import * as yup from 'yup';
import Button from '@mui/material/Button';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

import Menu from '~/components/Menu';
import { Textarea } from '@mui/joy';

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
  const [bio, setBio] = React.useState('');
  const [education, setEducation] = React.useState('');

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
        { bio: bio, education: education },
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
        <Box className="flex w-full justify-center">
          <form
            onSubmit={(e) => {
              submitForm(e);
            }}
            className="mt-9 max-w-md space-y-3 rounded-xl bg-blue-100 p-8 "
          >
            <h1 className="text-center text-2xl font-bold">Edit Course</h1>
            <p className=" text-lg font-semibold">bio: </p>
            <Textarea
              fullWidth
              id="bio"
              name="bio"
              label={bio}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-white"
            />

            <p className=" text-lg font-semibold">education: </p>

            <Textarea
              fullWidth
              id="education"
              name="education"
              label="education"
              type="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="bg-white"
            />

            <Button color="primary" variant="contained" type="submit" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
