import { Box, Button, Card } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import FormLabel from '@mui/material/FormLabel';

const ClassList = ({
  id,
  enrolledStudents,
  isTeacher,
}: {
  id: string;
  enrolledStudents: any;
  isTeacher: boolean;
}) => {
  const [cookies, setCookie] = useCookies(['data']);
  const [classList, setClassList] = React.useState([]);
  const userType = cookies?.data?.user?.type;
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
      <Box sx={{}}>
        <FormLabel style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          Class List
        </FormLabel>
        {enrolledStudents?.map((el) => (
          <Card
            className=" mb-1 flex flex-row justify-between rounded-xl border-black p-5 text-left shadow-xl"
            key={el.id}
          >
            {' '}
            {/* <Box className="fit-content text m-1 flex w-full  bg-blue-200 p-2">
              <>
                <h4 className="p-2  font-semibold">
                  {' '}
                  Name: {el.StudentProfile.user.name}
                </h4>
              </> */}
              <Box className="fit-content m-1 flex justify-between bg-white p-2">
              <div className="teacher-card__img" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="image-box" style={{ width: '40px', height: '40px', marginRight: '8px' }}>
                {el.StudentProfile.user.image ? (
                  <img
                    src={'http://localhost:5000/images/' + el.user.image}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src={'https://www.w3schools.com/howto/img_avatar.png'}
                  />
                )}
              </div>
              <h4 className="p-2  font-semibold">
                  {' '}
                  Name: {el.StudentProfile.user.name}
                </h4>
            </div>

              {isTeacher ? (
                <>
                  <h4 className="p-2  font-semibold">
                    {' '}
                    Phone: {el.StudentProfile.Phone}
                  </h4>
                </>
              ) : (
                ''
              )}
              <>
                <h4 className="p-2  font-semibold">
                  {' '}
                  Email: {el.StudentProfile.user.email}
                </h4>
              </>
            </Box>
            <br />
            {userType === 'TEACHER' && (
              <>
                {' '}
                {el.paid ? (
                  <p className="m-1 bg-green-500 p-5 text-white">Paid</p>
                ) : (
                  <p className="m-1 bg-red-500 p-5 text-white">Unpaid</p>
                )}
                <Button
                  onClick={() => kickout(el.StudentProfile.id)}
                  className="w-[60px] bg-red-500"
                >
                  Kick out
                </Button>
              </>
            )}
          </Card>
        ))}
      </Box>
    </div>
  );
};
export default ClassList;
