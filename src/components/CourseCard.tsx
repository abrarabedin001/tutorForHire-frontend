import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Rating from '@mui/material/Rating';
import Link from 'next/link';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useCookies, CookiesProvider } from 'react-cookie';
import axios from 'axios';
import { is } from 'date-fns/locale';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CourseCard({ course }: { course: any }) {
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(2);
  const [initial, setinitial] = React.useState('');
  console.log(course.id, 'course');
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //newly added by anik
  const CourseImage = ({ title }) => {
    const imageStyle = {
      width: '345px',
      height: '194px',
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

  React.useEffect(() => {
    if (course?.TeacherProfile) {
      const text = course?.TeacherProfile?.user?.name;
      const words = text.split(' '); // Split the text into an array of words
      const initials = words.map((word) => word.charAt(0)); // Extract the first character from each word
      const result = initials.join('.'); // Concatenate the initials with "."
      setinitial(result);

      console.log(result);
    }
  }, [course]);
  const router = useRouter();
  const data = useCookies(['data']);

  const cookie = data[0].data;
  console.log('Enrolled', course);

  const isEnrolled =
    course?.CourseEnroll?.map((el) => el.StudentProfile?.user?.id).filter(
      (el) => el == cookie?.user?.id,
    ).length == 1
      ? true
      : false;
  // const isEnrolled = false;
  // console.log('asdfasdf', isEnrolled2);
  const enrollCourse = async () => {
    try {
      const link = 'http://localhost:5000/enrollcourse/enroll';
      console.log(course.id, 'course');
      console.log(cookie.user.id, 'studentProfileId');
      const user = await axios.post(
        link,
        {
          courseId: course.id,
        },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `token ${cookie.token}`,
          },
        },
      );
      console.log(user);
      // await router.push('/home');
      window.location.href = window.location.href + '?refresh=' + Date.now();
    } catch (err) {
      console.log(err.message);
      if (err.response?.status === 500) {
        alert(`No seat available in this course`);
      } else if (err.response?.status === 400) {
        alert(`You can't enroll after course start date`);
      }
    }
  };
  const UnenrollCourse = async () => {
    try {
      const link =
        'http://localhost:5000/enrollcourse/unenroll/' +
        course.id +
        '/' +
        cookie.user.id;
      console.log(course.id, 'course');
      console.log(cookie.user.id, 'studentProfileId');
      console.log(course.id, 'course');
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
    }
  };
  console.log('rate', course?.rate);
  return (
    <CookiesProvider>
      <Card
        sx={{
          maxWidth: 345,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Link href={'http://localhost:3000/course/personal/' + course?.id}>
          <CardHeader
            avatar={
              course?.TeacherProfile?.image ? (
                <Avatar
                  sx={{
                    textTransform: 'uppercase',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    borderWidth: '1px',
                  }}
                  aria-label="recipe"
                >
                  <img
                    src={
                      'http://localhost:5000/images/' +
                      course?.TeacherProfile?.image
                    }
                    className=" w-full rounded-full"
                    alt="teacher"
                  />
                </Avatar>
              ) : (
                <Avatar
                  sx={{ bgcolor: red[500], textTransform: 'uppercase' }}
                  aria-label="recipe"
                >
                  {initial}
                </Avatar>
              )
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            titleTypographyProps={{
              className: 'titlename',
              color: 'rgb(107, 107, 229)',
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}
            title={course?.title}
            subheader={course?.createdAt.split('T')[0]}
          />
        </Link>

        <CourseImage title={course?.title} />
        <Rating
          name="simple-controlled"
          readOnly
          value={course?.rate}
          className=" ml-2 mt-2"
        />

        <CardActions disableSpacing>
          {cookie?.user?.type === 'STUDENT' ? (
            isEnrolled ? (
              <Button
                className="m-2 border border-black bg-red-500 p-2 hover:text-blue-800"
                onClick={UnenrollCourse}
              >
                UnEnroll
              </Button>
            ) : (
              <Button
                className="m-2 border border-black bg-red-500 p-2 hover:text-blue-800"
                onClick={enrollCourse}
              >
                Enroll
              </Button>
            )
          ) : (
            ''
          )}

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Descriptions:</Typography>
            <Typography paragraph>{course?.description}</Typography>

            <Typography paragraph>Seat Status:</Typography>
            <Typography paragraph>{course?.seatStatus}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </CookiesProvider>
  );
}
