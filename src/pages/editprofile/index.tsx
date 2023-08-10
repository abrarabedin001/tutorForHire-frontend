/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { use } from 'react';

import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Footer from '~/components/Footer';
import UploadFile from '~/components/UploadFile';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

import Menu from '~/components/Menu';
import { Textarea } from '@mui/joy';

const SignUp = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [bio, setBio] = React.useState('');
  const [education, setEducation] = React.useState('');
  const [Phone, setPhone] = React.useState('');
  const [image, setImage] = React.useState(null);
  const [oldPass, setOldPass] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');

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
              'Content-Type': 'multipart/form-data',
              Authorization: `token ${cookies.data.token}`,
            },
          },
        );
        console.log('profile', profile.data);
        setBio(profile.data.data.bio);
        setEducation(profile.data.data.education);
        setPhone(profile.data.data.Phone);
        setFile(profile.data.data.image);
        // await router.push('/home');
      } catch (err) {
        console.log(err.message);
      }
    };
    getStuff();
  }, []);
  const router = useRouter();
  console.log('cookeise', cookies.Name);
  const [file, setFile] = React.useState();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

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
      console.log('link', { bio, education, Phone, image });
      const user = await axios.patch(
        link,
        { bio: bio, education: education, Phone: Phone, image: file },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `token ${cookies.data.token}`,
          },
        },
      );
      console.log(user.res);
      await router.push('/showprofile');
    } catch (err) {
      console.log(err.message);
    }
  };

  const submitForm2 = async (e) => {
    e.preventDefault();

    try {
      let link = '';
      console.log('Not');

      link = 'http://localhost:5000/users/changepass';
      console.log('link', { bio, education, Phone, image });
      const user = await axios.patch(
        link,
        { oldPass: oldPass, newPass: newPassword },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${cookies.data.token}`,
          },
        },
      );
      removeCookie('data', '/');
      removeCookie('token', '/');
      setTimeout(() => router.push('/login'), 1000);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Menu />
      <Container>
        <Box className="mb-32 flex flex-wrap justify-center space-x-8">
          <form
            onSubmit={(e) => {
              submitForm(e);
            }}
            className="mt-9 max-w-md space-y-3 rounded-xl bg-blue-100 p-8 "
          >
            <h1 className="text-center text-2xl font-bold">Edit Profile</h1>
            <p className=" text-lg font-semibold">Subjects: </p>
            <TextField
              fullWidth
              id="bio"
              name="bio"
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
              multiline
              maxRows={1}
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-white"
            />
            <div>
              <input
                type="file"
                accept="image/png, .svg"
                name="image"
                onChange={handleChange}
              />
            </div>

            <Button color="primary" variant="contained" type="submit" fullWidth>
              Submit
            </Button>
          </form>
          <form
            onSubmit={(e) => {
              submitForm2(e);
            }}
            className="mt-9 max-w-md space-y-3 rounded-xl bg-blue-100 p-8 "
          >
            <h1 className="text-center text-2xl font-bold">Change Password</h1>
            <p className=" text-lg font-semibold">Old Password: </p>
            <TextField
              fullWidth
              id="Password"
              name="Password"
              multiline
              minRows={1} // Limiting to 2 rows
              maxRows={4}
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
              className="bg-white"
            />

            <p className=" text-lg font-semibold">New Password: </p>

            <TextField
              fullWidth
              id="Password"
              name="Password"
              multiline
              minRows={1} // Limiting to 2 rows
              maxRows={4}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
//hello guys
export default SignUp;
