import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';

import { Rating } from '@mui/material';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function CommentForm({ id }: { id: string }) {
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [comment, setComment] = React.useState('');
  const [commentList, setCommentList] = React.useState([]);
  const [cookies, setCookie] = useCookies(['data']);
  React.useEffect(() => {
    const comments = async () => {
      try {
        const link = 'http://localhost:5000/review/seereview';
        console.log(id, 'course');
        console.log(cookies.data.user.id, 'studentProfileId');
        const list = await axios.get(
          link,
          {
            courseId: id,
          },
          {
            headers: {
              'content-type': 'application/json',
              Authorization: `token ${cookies.data.token}`,
            },
          },
        );
        console.log('comments lists');
        console.log(list.data.review);
        setCommentList(list.data.review);

        // await router.push('/home');
      } catch (err) {
        console.log(err.message);
      }
    };
    comments();
  }, []);

  const onSubmit = async () => {
    try {
      console.log('enters');
      let link = '';

      if (cookies.data.user.type === 'STUDENT') {
        link = 'http://localhost:5000/review/givereview';
      } else {
        window.alert('A teacher can not comment on a course');
        return;
      }
      console.log({ courseId: id, comment: comment });
      const response = await axios.post(
        link,
        { courseId: id, comment: comment },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `token ${cookies.data.token}`,
          },
        },
      );
      console.log(response);
      // await router.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel>Your comment</FormLabel>
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
              value={2}
              onChange={(event, newValue) => {
                // setValue(newValue);
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
      <Box sx={{ mt: 2 }}>
        <FormLabel>Comments</FormLabel>
        {/* {commentList?.map((comment) => ({
           comment
        }))} */}
      </Box>
    </FormControl>
  );
}
