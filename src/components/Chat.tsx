import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';

import { Card, Rating } from '@mui/material';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Chat({
  id,
  change,
  setChange,
}: {
  id: string;
  change: any;
  setChange: any;
}) {
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rate, setRate] = React.useState(0);
  const [chatChange, setChatChange] = React.useState(0);
  const [chat, setChat] = React.useState('');
  const [chatList, setChatList] = React.useState([]);
  const [cookies, setCookie] = useCookies(['data']);
  React.useEffect(() => {
    const chats = async () => {
      try {
        console.log('comments sections');
        const link = 'http://localhost:5000/chat/seechat/' + id;
        // console.log(id, 'course');
        // console.log(cookies.data.user.id, 'studentProfileId');
        console.log('link', link);
        const list = await axios.get(
          link,

          {
            headers: {
              'content-type': 'application/json',
              Authorization: `token ${cookies.data.token}`,
            },
          },
        );

        console.log('comments lists');
        console.log(list.data.showChat);
        setChatList(list.data.showChat);

        // await router.push('/home');
      } catch (err) {
        // console.log(err.message);
      }
    };
    chats();
  }, [chatChange]);

  const onSubmit = async () => {
    try {
      console.log('enters');
      console.log(chat);
      const link = 'http://localhost:5000/chat/givechat';

      // console.log({ courseId: id, comment: comment });
      const response_chat = await axios.post(
        link,
        { courseId: id, chat: chat },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `token ${cookies.data.token}`,
          },
        },
      );
      console.log(response_chat.data);
      setChatChange(chatChange + 1);
      setChat('');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex  w-full flex-col">
      <FormControl sx={{ width: '100%' }}>
        <FormLabel style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          Chat
        </FormLabel>
        <Textarea
          placeholder="Type something here…"
          minRows={3}
          value={chat}
          onChange={(e) => setChat(e.target.value)}
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
              <Button sx={{ ml: 'auto' }} onClick={() => void onSubmit()}>
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
      <Box sx={{ mt: 2 }}>
        <FormLabel></FormLabel>

        {chatList?.map((el) => (
          <Card
            className=" mb-1 flex flex-col justify-between rounded-xl border-black p-5 text-left shadow-xl"
            key={el.id}
          >
            {' '}
            <Box className="fit-content m-1 flex justify-between bg-blue-200 p-2">
              <h4>{el.user.name}</h4>

              <h4>{el.created_at.split('T')[0]}</h4>
            </Box>
            <br />
            <h6 className="fit-content m-1 bg-blue-200 p-2">{el.chat}</h6>
          </Card>
        ))}
      </Box>
    </div>
  );
}
