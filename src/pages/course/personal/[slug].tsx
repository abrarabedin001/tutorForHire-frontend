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

const EditCourse = () => {
  const [cookies, setCookie] = useCookies(['user']);
  const [data, setData] = React.useState([]);
  const router = useRouter();
  const [open, setOpen] = React.useState('comment');

  const slug1 = router.asPath.split('course/personal/')[1];
  // console.log('slug', typeof slug1);
  const link = 'http://localhost:5000/course/singlecourse/' + slug1;
  // console.log('link', link);
  // console.log('cookeise', cookies?.data?.user?.id);
  const [type] = React.useState(cookies?.data?.user?.type);

  const data1 = hook(link);
  // console.log('data', data1?.course);
  // console.log(data1?.course?.title);

  return (
    <CookiesProvider>
      <Menu />
      <Container className="mb-10 mt-7">
        {data1?.course && (
          <Box className=" flex w-full flex-col justify-center">
            <CourseMainBody
              id={data1?.course?.id}
              slug={slug1}
              cookies={cookies}
              title={data1?.course?.title}
              description={data1?.course?.description}
              categories={data1?.course?.categories}
              seatStatus={data1?.course?.seatStatus}
              address={data1?.course?.address}
              startDate={data1?.course?.startDate}
              endDate={data1?.course?.endDate}
              classes={'w-full flex-col justify-center space-y-2 '}
            ></CourseMainBody>
            <Box className="flex w-full justify-center space-x-3 bg-green-400 p-5">
              <button
                onClick={() => {
                  setOpen('comment');
                }}
              >
                Comments
              </button>
              <button
                onClick={() => {
                  console.log('class list');
                  setOpen('class-list');
                }}
              >
                Class List
              </button>
              <button
                onClick={() => {
                  setOpen('chat');
                }}
              >
                Chats
              </button>
            </Box>
            <Box className="flex w-full ">
              {open === 'comment'
                ? data1?.course?.id && <CommentForm id={data1?.course?.id} />
                : ''}

              {open === 'class-list'
                ? data1?.course?.id && <ClassList id={data1?.course?.id} />
                : ''}

              {open === 'chat'
                ? data1?.course?.id && <Chat id={data1?.course?.id} />
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
