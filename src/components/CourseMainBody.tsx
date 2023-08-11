import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Rating,
  Typography,
} from '@mui/material';

import * as React from 'react';

import Container from '@mui/material/Container';
import Courses from '~/components/Courses';
import HeaderSidebar from '~/components/HeaderSidebar';
import { add } from 'date-fns';
import TeacherCard from './TeacherCard';
import { useCookies, CookiesProvider } from 'react-cookie';
import axios from 'axios';
import TextField from '@mui/material/TextField';

const CourseImage = ({ title }) => {
  const imageStyle = {
    width: '100%',
    height: '100%',
    backgroundImage: 'url(/images/img3.png)', // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  };
  const titleStyle = {
    color: 'white',
    fontWeight: 'bolder',
    fontSize: '1.5rem', // Adjust the font size as needed
    padding: '20px',
    borderRadius: '50%',
    backgroundColor: 'transparent',

    border: '2px solid white',
    textTransform: 'uppercase',
  };
  return (
    <div style={imageStyle}>
      <Typography variant="h5" component="h5" style={titleStyle}>
        {title}
      </Typography>
    </div>
  );
};

const CourseMainBody = ({
  id,
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
  enrolledStudents,
  TeacherProfile,
  isTeacher,
  isStudent,
}: {
  id: string;
  slug: string;
  title: string;
  description: string;
  categories: string;
  seatStatus: number;
  address: string;
  startDate: Date;
  endDate: Date;
  cookies: Date;
  classes: string;
  enrolledStudents: any;
  TeacherProfile: any;
  isTeacher: boolean;
  isStudent: boolean;
}) => {
  const data = useCookies(['data']);
  const cookie = data[0].data;
  const [totalRating, setTotalRating] = React.useState(0);
  const [showPaymentCard, setShowPaymentCard] = React.useState(false);

  React.useEffect(() => {
    const TotalRating = async () => {
      console.log('fucking id');
      console.log(id);
      const TotalRatinglink =
        'http://localhost:5000/ratingreview/seetotalrating/' + id;
      const totalRating = await axios.get(
        TotalRatinglink,

        // {
        //   headers: {
        //     'content-type': 'application/json',
        //     Authorization: `token ${cookies.data.token}`,
        //   },
        // },
      );
      console.log('TotalRatingLink', TotalRatinglink);
      setTotalRating(totalRating.data.averageRating);
      console.log(totalRating.data.averageRating, 'totalRating');
    };
    TotalRating();
  }, []);

const enrollCourse = async () => {
  try {
    const link = 'http://localhost:5000/enrollcourse/enroll';

    const user = await axios.post(
      link,
      {
        courseId: id,
      },
      {
        headers: {
          'content-type': 'application/json',
          Authorization: `token ${cookie.token}`,
        },
      }
    );

    // if (user) {
    //   setIsEnrolled(true);
    // }
  } catch (err) {
    console.log(err.message);
  }
};

const confirmPayment = async () => {
  try {
    const paidLink = 'http://localhost:5000/enrollcourse/paid';

    const response = await axios.patch(
      paidLink,
      {
        courseId: id,
        paid: true,
      },
      {
        headers: {
          'content-type': 'application/json',
          Authorization: `token ${cookie.token}`,
        },
      }
    );
    console.log(response.data.coursepay)
    if (response.data.coursepay) {

      setShowPaymentCard(false); 
      window.location.reload()
      // Hide payment card
      // Optionally, you can update local state or UI to reflect successful payment
    }
  } catch (err) {
    console.log(err.message);
  }
};
  return (
    // <Box className="w-70 flex-row space-y-2 ">
    <Box className={classes}>
      <Card className="  flex w-full flex-col justify-center  p-3 shadow-lg">
        <Grid
          container
          className="mb-5 mt-0 w-full bg-blue-100 p-3 shadow-lg  "
        >
          <Grid item xs={8}>
            <Typography
              className="px-10 py-5"
              variant="h5"
              component="h5"
              style={{ fontWeight: 'bold', textTransform: 'capitalize' }}
            >
              {title}{' '}
            </Typography>
            <Divider />
            <Box className="flex gap-x-3 p-5">
                   {/* ... Other course details */}
              {isStudent && (
                <Button variant="contained" onClick={enrollCourse} style={{ height: '40px' }}>
                  Enroll
                </Button>
              )}
                {isStudent && !showPaymentCard && !enrolledStudents[0]?.paid && (
                <Button
                  variant="contained"
                  onClick={() => setShowPaymentCard(true)}
                  style={{ backgroundColor: 'red', color: 'white', height: '40px' }}
                >
                  Payment
                </Button>
              )}
              {isStudent && enrolledStudents[0]?.paid && (
                <Button
                  variant="contained"
                  style={{ backgroundColor: 'green', color: 'white', height: '40px' }}
                  disabled
                >
                  Paid
                </Button>
              )}



                  {showPaymentCard && (
              <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                <Typography variant="body1" style={{ backgroundColor: 'lightpink', border: '1px', padding: '5px',marginBottom:'8px',fontWeight:'bold' }}>
                  Pay via Bkash</Typography>
              
                {/* Display the phone number using Typography or p */}
                <Typography variant="body1" style={{color:'blue',fontWeight:'bold',border:'2px solid black', padding: '5px'}}>Bkash: {TeacherProfile.Phone}</Typography>

                <Button
                  variant="contained"
                  onClick={confirmPayment}
                  style={{ backgroundColor: 'green', color: 'white', marginTop: '10px' }}
                >
                  Confirm Payment
                </Button>
              </Card>
            )}
              {isTeacher ? (
                <a href={'/course/edit/' + slug}>
                  <Button variant="contained">Edit</Button>
                </a>
              ) : (
                ''
              )}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <CourseImage title={title} />
          </Grid>
        </Grid>

        <Box className="float-right flex w-full justify-center">
          <Card className="m-3  flex  w-full justify-between bg-blue-500 p-3 shadow-lg ">
            <Box className="w-[70%]">
              <Box mb={2}>
                <Typography
                  variant="h6"
                  component="p"
                  style={{ fontWeight: 'bold' }}
                >
                  Description:
                </Typography>
                <Typography variant="p" component="p">
                  {description}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography
                  variant="h6"
                  component="p"
                  style={{ fontWeight: 'bold' }}
                >
                  Address:
                </Typography>
                <Typography variant="p" component="p">
                  {address}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography
                  variant="h6"
                  component="p"
                  style={{ fontWeight: 'bold' }}
                >
                  Seat Status:
                </Typography>
                <Typography variant="p" component="p">
                  {seatStatus}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography
                  variant="h6"
                  component="p"
                  style={{ fontWeight: 'bold' }}
                >
                  Categories:
                </Typography>
                <Typography variant="p" component="p">
                  {categories}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography
                  variant="h6"
                  component="p"
                  style={{ fontWeight: 'bold' }}
                >
                  Start Date:
                </Typography>
                <Typography variant="p" component="p">
                  {new Date(startDate).toLocaleDateString()}
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography
                  variant="h6"
                  component="p"
                  style={{ fontWeight: 'bold' }}
                >
                  End Date:
                </Typography>
                <Typography variant="p" component="p">
                  {new Date(endDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography
                  variant="h6"
                  component="p"
                  style={{ fontWeight: 'bold' }}
                >
                  Total Rating
                </Typography>
                <Rating name="simple-controlled" value={totalRating} readOnly />
              </Box>
            </Box>

            <TeacherCard className="w-[30%] " TeacherProfile={TeacherProfile} />
          </Card>
        </Box>
      </Card>
    </Box>
  );
};

export default CourseMainBody;
