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
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(2);
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
  const text=course?.TeacherProfile?.user?.name;
  const words = text.split(' '); // Split the text into an array of words
  const initials = words.map(word => word.charAt(0)); // Extract the first character from each word
  const result = initials.join('.'); // Concatenate the initials with "."
  console.log(result)

  const isEnrolled = router.asPath.includes('enrolledcourses');
  const data = useCookies(['data']);
  const cookie = data[0].data;
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
    } catch (err) {
      console.log(err.message);
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
          id: course.id,
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
    } catch (err) {
      console.log(err.message);
    }
  };
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
              <Avatar sx={{ bgcolor: red[500], textTransform:'uppercase'}} aria-label="recipe">
                {result}
              </Avatar>
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

        {/* <CardMedia
          component="img"
          height="194"
          image="https://rb.gy/h90m3"
          alt="Paella dish"
        /> */}
        <CourseImage title={course?.title} />
        <Rating
          name="simple-controlled"
          value={value}
          onChange={async (event, newValue) => {
            try {
              await axios.post(
                'http://localhost:5000/rating/giverating',
                { courseId: course.id, rate: newValue },
                {
                  headers: {
                    'content-type': 'application/json',
                    Authorization: `token ${cookie.token}`,
                  },
                },
              );
            } catch (e) {
              console.log(e);
            }
          }}
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
          </CardContent>
        </Collapse>
      </Card>
    </CookiesProvider>
  );
}
