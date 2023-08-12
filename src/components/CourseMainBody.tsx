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
import { FaPaypal } from 'react-icons/fa';
import TeacherCard from './TeacherCard';
import { useCookies, CookiesProvider } from 'react-cookie';
import axios from 'axios';
import DemoQuizButton from './DemoQuizButton'; // Adjust the path based on your project structure

import { useRouter } from 'next/router';

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
  cost,
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
  cost: number;
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
  const router = useRouter();

  React.useEffect(() => {
    const TotalRating = async () => {
      console.log('fucking id');
      console.log(id);
      const TotalRatinglink =
        'http://localhost:5000/ratingreview/seetotalrating/' + id;
      const totalRating = await axios.get(TotalRatinglink);
      console.log('TotalRatingLink', TotalRatinglink);
      setTotalRating(totalRating.data.averageRating);
      console.log(totalRating.data.averageRating, 'totalRating');
    };
    TotalRating();
  }, []);
  const UnenrollCourse = async () => {
    console.log(cookie);
    try {
      const link =
        'http://localhost:5000/enrollcourse/unenroll/' +
        id +
        '/' +
        cookie.user.id;
      // console.log(course.id, 'course');
      // console.log(cookie.user.id, 'studentProfileId');
      console.log(cookie, 'course');
      const user = await axios.delete(
        link,

        {
          headers: {
            'content-type': 'application/json',
            Authorization: `token ${cookie.token}`,
          },
        },
      );
      console.log(user);
      await router.reload();
    } catch (err) {
      console.log(err.message);
      if (err.response?.status === 400) {
        alert(`Cannot unenroll after course start date`);
      }
      // await router.reload();
    }
  };
  const togglePaymentCard = () => {
    setShowPaymentCard(!showPaymentCard); // Toggle the value
  };

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
        },
      );
      await router.reload();
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
        },
      );
      console.log(response.data.coursepay);
      if (response.data.coursepay) {
        setShowPaymentCard(false);
        window.location.reload();
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
            <Box className="flex  flex-row gap-x-3 p-5">
              {/* ... Other course details */}
              {cookie ? (
                !isTeacher ? (
                  isStudent ? (
                    <Button
                      variant="contained"
                      onClick={UnenrollCourse}
                      style={{ height: '40px' }}
                    >
                      Unenroll
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={enrollCourse}
                      style={{ height: '40px' }}
                    >
                      Enroll
                    </Button>
                  )
                ) : (
                  ' '
                )
              ) : (
                ' '
              )}
              {}
              {isStudent && !enrolledStudents[0]?.paid && (
                <Button
                  variant="contained"
                  onClick={togglePaymentCard}
                  style={{
                    backgroundColor: '#3498DB', // PayPal Blue
                    color: 'white',
                    height: '40px',
                    marginBottom: '10px',
                    borderRadius: '4px',
                  }}
                >
                  Make Payment
                </Button>
              )}

              {isStudent && enrolledStudents[0]?.paid && (
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#27AE60', // Green
                    color: 'white',
                    height: '40px',
                    borderRadius: '4px',
                    pointerEvents: 'none', // Disable pointer events
                    opacity: 0.7, // Reduce opacity
                  }}
                >
                  Payment Completed
                </Button>
              )}

              {showPaymentCard && (
                <Card
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '30px',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    background: 'linear-gradient(180deg, #FFF9F3 0%, #FFFFFF 100%)', // Subtle gradient background
                  }}
                >
                  <FaPaypal
                    size={40}
                    color="#169BD7" // PayPal Blue
                    style={{ marginBottom: '16px' }}
                  />

                  <Typography
                    variant="h5"
                    style={{
                      backgroundColor: '#FFC078', // Light Orange
                      padding: '12px',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      marginBottom: '16px',
                    }}
                  >
                    Secure Payment
                  </Typography>

                  <Typography
                    variant="body1"
                    style={{
                      color: '#444', // Dark Gray
                      fontWeight: 'bold',
                      marginBottom: '18px',
                    }}
                  >
                    Total Amount: {cost} $
                  </Typography>

                  <Typography
                    variant="body1"
                    style={{
                      color: '#169BD7', // PayPal Blue
                      fontWeight: 'bold',
                      borderRadius: '4px',
                      padding: '8px',
                      backgroundColor: '#EAF2F8', // Light Blue
                      marginBottom: '16px',
                    }}
                  >
                    Payment Method: PayPal
                  </Typography>

                  <Typography
                    variant="body1"
                    style={{
                      color: '#555', // Dark Gray
                      fontWeight: 'bold',
                      borderRadius: '4px',
                      padding: '8px',
                      backgroundColor: '#F2F2F2', // Light Gray
                      marginBottom: '16px',
                    }}
                  >
                    PayPal Email: tutorforhire@gmail.com
                  </Typography>

                  <Button
                    variant="contained"
                    onClick={confirmPayment}
                    style={{
                      background: 'linear-gradient(180deg, #45D49D 0%, #3BB78F 100%)', // Gradient Green
                      color: 'white',
                      marginTop: '20px',
                      borderRadius: '4px',
                    }}
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

                <DemoQuizButton />
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
