/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import hook from './hooks/hook';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from 'axios';
import FormikComponent from '~/components/FormikComponent';
import Chat from '~/components/Chat';
import HeaderSidebar from '~/components/HeaderSidebar';
import CourseMainBody from '~/components/CourseMainBody';
import Menu from '~/components/Menu';
import CommentForm from '~/components/CommentForm';
import ClassList from '~/components/ClassList';
import Footer from '~/components/Footer';
import { is } from 'date-fns/locale';

const EditCourse = () => {
  const [cookies, setCookie] = useCookies(['user']);
  const [data1, setData] = React.useState([]);
  const router = useRouter();
  const [open, setOpen] = React.useState('comment');
  const [slug, setSlug] = React.useState('');
  const [isTeacher, setIsTeacher] = React.useState(false);
  const [isStudent, setIsStudent] = React.useState(false);
  const [change, setChange] = React.useState(0);
  const [type] = React.useState(cookies?.data?.user?.type);

  React.useEffect(() => {
    setSlug(router.query.slug);
    const link =
      'http://localhost:5000/course/singlecourse/' + router.query.slug;
    fetch(link)
      .then((res) => res.json())
      .then((data) => setData(data));
    // data1.course.TeacherProfile.user.id === cookies?.data?.user?.id
    //   ? setIsTeacher(true)
    //   : setIsTeacher(false);

    // if (isTeacher || isStudent) {
    //   if (open === 'class-list') {
    //     if (data1?.course?.id) {
    //       setClassList(<ClassList id={data1?.course?.id} />);
    //     }
    //   }
    // }
    console.log('techer', data1);
    console.log('data1', data1);
  }, [change, router.isReady]);
  console.log('data1', data1);

  React.useEffect(() => {
    if (data1) {
      console.log('course enroll', data1?.course?.CourseEnroll);
      const student = data1?.course?.CourseEnroll.filter(
        (el) => el.StudentProfile.user.id === cookies?.data?.user?.id,
      );
      if (student?.length == 1) {
        setIsStudent(true);
      }

      data1?.course?.TeacherProfile.user.id === cookies?.data?.user?.id
        ? setIsTeacher(true)
        : setIsTeacher(false);
    }
  }, [data1]);

  // console.log(
  //   'data1',
  //   data1.course.CourseEnroll.filter(
  //     (data) => data.StudentProfile.user.id === cookies?.data?.user?.id,
  //   ),
  // );
  return (
    <CookiesProvider>
      <Menu />
      <Container className="mb-10 mt-7">
        {data1?.course && (
          <Box className=" flex w-full flex-col justify-center">
            <CourseMainBody
              id={data1?.course?.id}
              slug={slug}
              cookies={cookies}
              title={data1?.course?.title}
              description={data1?.course?.description}
              categories={data1?.course?.categories}
              seatStatus={data1?.course?.seatStatus}
              address={data1?.course?.address}
              startDate={data1?.course?.startDate}
              endDate={data1?.course?.endDate}
              enrolledStudents={data1?.course?.CourseEnroll}
              TeacherProfile={data1?.course?.TeacherProfile}
              classes={'w-full flex-col justify-center space-y-2 '}
            ></CourseMainBody>
            {isTeacher || isStudent ? (
              <Box className="mb-5 mt-5 flex w-full justify-center space-x-3 bg-blue-400 p-5 shadow-md">
                <button
                  className="rounded-md bg-white p-2 hover:scale-105"
                  onClick={() => {
                    setOpen('comment');
                  }}
                >
                  Comments
                </button>
                <button
                  className="rounded-md bg-white p-2 hover:scale-105"
                  onClick={() => {
                    console.log('class list');
                    setOpen('class-list');
                  }}
                >
                  Class List
                </button>
                <button
                  className="rounded-md bg-white p-2 hover:scale-105"
                  onClick={() => {
                    setOpen('chat');
                  }}
                >
                  Chats
                </button>
              </Box>
            ) : (
              ''
            )}

            <Box className="flex w-full ">
              {open === 'comment'
                ? data1?.course?.id && (
                    <CommentForm
                      id={data1?.course?.id}
                      isTeacher={isTeacher}
                      isStudent={isStudent}
                    />
                  )
                : ''}

              {isTeacher || isStudent
                ? open === 'class-list'
                  ? data1?.course?.id && <ClassList id={data1?.course?.id} />
                  : ''
                : ''}
              {isTeacher || isStudent
                ? open === 'chat'
                  ? data1?.course?.id && <Chat id={data1?.course?.id} />
                  : ''
                : ''}
            </Box>
          </Box>
        )}
      </Container>
      <Footer />
    </CookiesProvider>
  );
};

export default EditCourse;
