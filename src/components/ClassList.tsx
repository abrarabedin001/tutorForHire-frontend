import { Box, Button, Card } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const ClassList = ({ id }: { id: string }) => {
  const [cookies, setCookie] = useCookies(['data']);
  const [classList, setClassList] = React.useState([]);
  const kickout = async (studentprofileid: string) => {
    console.log('kickout', studentprofileid);
    try {
      console.log('delete student');
      const link =
        'http://localhost:5000/enrollcourse/kickout/' +
        id +
        '/' +
        studentprofileid;
      // console.log(id, 'course');
      console.log(cookies.data.user.id, 'studentProfileId');
      console.log('link', link);
      const classList = await axios.delete(
        link,

        {
          headers: {
            'content-type': 'application/json',
            Authorization: `token ${cookies.data.token}`,
          },
        },
      );
      console.log('delete student');

      // await router.push('/home');
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    const classList = async () => {
      try {
        console.log('class list sections');
        const link =
          'http://localhost:5000/enrollcourse/enrolledstudents/' + id;
        // console.log(id, 'course');
        console.log(cookies.data.user.id, 'studentProfileId');
        console.log('link', link);
        const classList = await axios.get(link, {
          headers: {
            'content-type': 'application/json',
            Authorization: `token ${cookies.data.token}`,
          },
        });
        console.log('class lists');
        console.log('classList', classList.data.message);
        setClassList(classList.data.message);

        // await router.push('/home');
      } catch (err) {
        console.log(err.message);
      }
    };
    classList();
  }, []);
  return (
    <div className="w-full">
      <Box sx={{ mt: 2 }}>
        class List
        {classList?.map((el) => (
          <Card
            className=" m-2 flex flex-row justify-between rounded-xl border-black p-5 text-left shadow-xl"
            key={el.id}
          >
            {' '}
            <Box className="fit-content m-1 flex w-full justify-between bg-blue-200 p-2">
              <h4>{el.StudentProfile.user.name}</h4>
            </Box>
            <br />
            <Button
              onClick={() => kickout(el.StudentProfile.id)}
              className="w-[60px]"
            >
              Kick out
            </Button>
          </Card>
        ))}
      </Box>
    </div>
  );
};
export default ClassList;
