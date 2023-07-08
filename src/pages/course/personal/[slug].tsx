/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import hook from './hooks/hook';
import axios from 'axios';
import FormikComponent from '~/components/FormikComponent';

const EditCourse = () => {
  const [cookies, setCookie] = useCookies(['user']);
  const [data, setData] = React.useState([]);
  const router = useRouter();

  const slug1 = router.asPath.split('course/personal/')[1];
  console.log('slug', typeof slug1);
  const link = 'http://localhost:5000/course/singlecourse/' + slug1;
  console.log('link', link);
  console.log('cookeise', cookies?.data?.user?.id);
  const [type] = React.useState(cookies?.data?.user?.type);

  const data1 = hook(link);
  console.log('data', data1?.course);
  console.log(data1?.course?.title);

  return (
    <CookiesProvider>
      {data1?.course && (
        <FormikComponent
          slug={slug1}
          cookies={cookies}
          title={data1?.course?.title}
          description={data1?.course?.description}
          categories={data1?.course?.categories}
          seatStatus={data1?.course?.seatStatus}
          address={data1?.course?.address}
          endDate={data1?.course?.endDate}
        />
      )}
      {/* somehtingnkj */}
    </CookiesProvider>
  );
};

export default EditCourse;
