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
import TeacherCard from '~/components/TeacherCard';

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
    .required('Phone no. is required'),
});

const SignUp = () => {
  const [cookies, setCookie] = useCookies(['user']);
  const [bio, setBio] = React.useState('');
  const [education, setEducation] = React.useState('');
  const [profile, setProfile] = React.useState({});
  const [Phone, setPhone] = React.useState('');
  const [image, setImage] = React.useState('');

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
        setProfile(profile.data.data);
        setBio(profile.data.data.bio);
        setEducation(profile.data.data.education);
        setPhone(profile.data.data.Phone);
        setImage(profile.data.data.image);
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
      console.log('Not');
      if (cookies.data.user.type === 'STUDENT') {
        link = 'http://localhost:5000/student/studentupdate';
      } else {
        link = 'http://localhost:5000/tutor/tutorupdate';
      }
      const user = await axios.patch(
        link,
        { bio: bio, education: education, Phone: Phone },
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
        <Box className="mb-64 flex w-full justify-center">
          <form
            onSubmit={(e) => {
              submitForm(e);
            }}
            className="mt-9 w-[500px] space-y-3 rounded-xl bg-blue-100 p-8 "
          >
            <div className="teacher-card__img flex justify-center">
              {image ? (
                <img
                  src={'http://localhost:5000/images/' + image}
                  alt="teacher"
                />
              ) : (
                <img
                  src={'https://www.w3schools.com/howto/img_avatar.png'}
                  alt="teacher"
                />
              )}
            </div>
            <h1 className="text-center text-2xl font-bold">Profile</h1>
            <p className=" text-lg font-semibold">Subjects: </p>

            <p className="bg-white p-2 text-left  text-lg">{bio}</p>

            <p className=" text-lg font-semibold">Education: </p>

            <p className="bg-white p-2 text-left  text-lg">{education}</p>

            <p className=" text-lg font-semibold">Phone-no: </p>

            <p className="bg-white p-2 text-left  text-lg">{Phone}</p>
            {/* <Button
              color="primary"
              variant="contained"
              type="submit"
              className="display-none"
              fullWidth
            >
              Submit
            </Button> */}
          </form>
        </Box>
      </Container>
      <Footer />
    </>
  );
};
//hello guys
export default SignUp;
