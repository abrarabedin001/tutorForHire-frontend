import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';

import { Card, Rating } from '@mui/material';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { is } from 'date-fns/locale';

export default function CommentForm({
  id,
  isTeacher,
  isStudent,
}: {
  id: string;
  isTeacher: boolean;
  isStudent: boolean;
}) {
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rate, setRate] = React.useState(0);
  const [commentChange, setCommentChange] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [commentList, setCommentList] = React.useState([]);
  const [cookies, setCookie] = useCookies(['data']);
  React.useEffect(() => {
    console.log(isTeacher, isStudent, 'isTeacher, isStudent');
    const comments = async () => {
      try {
        console.log('comments sections');
        const link =
          'http://localhost:5000/ratingreview/showRatingReview/' + id;

        const list = await axios.get(
          link,

          // {
          //   headers: {
          //     'content-type': 'application/json',
          //     Authorization: `token ${cookies.data.token}`,
          //   },
          // },
        );

        setCommentList(list.data.ratingReview);

        // await router.push('/home');
      } catch (err) {
        // console.log(err.message);
      }
    };
    comments();
  }, [commentChange]);

  const onSubmit = async () => {
    try {
      // console.log('enters');
      let link = '';

      if (cookies.data.user.type === 'STUDENT') {
        link = 'http://localhost:5000/ratingreview/giveRatingReview';
      } else {
        window.alert('A teacher can not comment on a course');
        return;
      }

      // console.log({ courseId: id, comment: comment });
      const response_comment = await axios.post(
        link,
        { courseId: id, comment: comment, rate: rate },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `token ${cookies.data.token}`,
          },
        },
      );
      setCommentChange(commentChange + 1);
      setComment('');
      setRate(0);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex w-full flex-col">
      {isTeacher || isStudent ? (
        <FormControl sx={{ width: '100%' }}>
          <FormLabel style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            Write a comment
          </FormLabel>
          <Textarea
            placeholder="Type something here…"
            minRows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            endDecorator={
              <Box
                sx={{
                  display: 'flex',
                  gap: 'var(--Textarea-paddingBlock)',
                  pt: 'var(--Textarea-paddingBlock)',
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  width: '100%',
                  flex: 'auto',
                }}
              >
                <Rating
                  name="simple-controlled"
                  value={rate}
                  onChange={(event, newValue) => {
                    setRate(newValue);
                    console.log(newValue);
                  }}
                />

                <Button sx={{ ml: 'auto' }} onClick={() => onSubmit()}>
                  Send
                </Button>
              </Box>
            }
            sx={{
              minWidth: 300,
              fontWeight,
              fontStyle: italic ? 'italic' : 'initial',
            }}
          />
        </FormControl>
      ) : (
        ' '
      )}

      <Box sx={{ mt: 2 }}>
        <FormLabel></FormLabel>

        {commentList?.map((el) => (
          <Card
            className="mt-1  flex flex-col justify-between rounded-xl border-black bg-blue-400 p-5 text-left shadow-xl"
            key={el.id}
          >
            {' '}
            <Box className="fit-content m-1 flex justify-between bg-blue-200 p-2">
              <h4 className="text-lg font-bold">
                {el.StudentProfile.user.name}
              </h4>
              <Rating name="simple-controlled" value={el.rate} readOnly />
              <h4>{el.ratingReviewDate.split('T')[0]}</h4>
            </Box>
            <br />
            <h6 className="fit-content m-1 bg-blue-200 p-2">{el.comment}</h6>
          </Card>
        ))}
      </Box>
    </div>
  );
}
