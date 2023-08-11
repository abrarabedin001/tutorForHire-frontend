import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';

import { Card, Rating } from '@mui/material';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Assessments({ id }: { id: string }) {
  const [marks, setMarks] = React.useState(0);
  const [start_date, setStart_Date] = React.useState(0);
  const [end_date, setEnd_Date] = React.useState(0);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rate, setRate] = React.useState(0);
  const [assignmentChange, setAssignmentChange] = React.useState(0);
  const [assignment, setAssignment] = React.useState('');
  const [assignment_name, setAssignmentName] = React.useState('');
  const [assignmentList, setAssignmentList] = React.useState([]);
  const [file, setFile] = React.useState(null);
  const [cookies, setCookie] = useCookies(['data']);
  React.useEffect(() => {
    const assignments = async () => {
      try {
        console.log('comments sections');
        const link = 'http://localhost:5000/classroom/getques/' + id;
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

        console.log('Assignment lists');
        console.log(list.data.question);
        setAssignmentList(list.data.question);

        // await router.push('/home');
      } catch (err) {
        // console.log(err.message);
      }
    };
    assignments();
  }, [assignmentChange]);

  const onSubmit = async () => {
    try {
      console.log('enters');
      console.log(assignment, assignment_name, marks, start_date, end_date);
      console.log();
      const link = 'http://localhost:5000/classroom/createques';

      // console.log({ courseId: id, comment: comment });
      const response_assignment = await axios.post(
        link,
        {
          title: assignment_name,
          question: assignment,
          marks: marks,
          start_date: start_date,
          end_date: end_date,
          courseId: id,
        },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `token ${cookies.data.token}`,
          },
        },
      );
      console.log(response_assignment.data);
      setAssignmentChange(assignmentChange + 1);
      setAssignment('');
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChangeTeacher = async (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files[0]);
    event.preventDefault();

    try {
      let link = '';
      console.log('Not');
      if (cookies.data.user.type === 'STUDENT') {
        link = 'http://localhost:5000/classroom/createans';
      } else {
        link = 'http://localhost:5000/classroom/createans';
      }
      console.log('link', { file: file });
      const user = await axios.patch(
        link,
        { image: file },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `token ${cookies.data.token}`,
          },
        },
      );
      console.log(user.res);
      // await router.push('/home');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex  w-full flex-col rounded bg-white/20 p-5">
      <FormControl sx={{ width: '100%' }}>
        <FormLabel style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          Assessments
        </FormLabel>
        <Textarea
          placeholder="Assignment Name"
          minRows={1}
          value={assignment_name}
          onChange={(e) => setAssignmentName(e.target.value)}
        ></Textarea>
        <Textarea
          placeholder="Type something here…"
          minRows={3}
          value={assignment}
          onChange={(e) => setAssignment(e.target.value)}
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
                text: 'center',
              }}
            >
              {' '}
              <p className="p-2 text-center">Marks: </p>
              <Textarea
                placeholder="Type something here…"
                minRows={1}
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
              ></Textarea>
              <p className="p-2 text-center">Start Date: </p>
              <input
                type="date"
                className="rounded border"
                value={start_date}
                onChange={(e) => {
                  setStart_Date(e.target.value);
                }}
              />
              <p className="p-2 text-center">End Date: </p>
              <input
                type="date"
                className="rounded border"
                value={end_date}
                onChange={(e) => {
                  setEnd_Date(e.target.value);
                }}
              />
              <Button sx={{ ml: 'auto' }} onClick={() => void onSubmit()}>
                Send
              </Button>
            </Box>
          }
          sx={{
            minWidth: 300,
            fontWeight,
          }}
        />
      </FormControl>
      <Box sx={{ mt: 2 }}>
        <FormLabel></FormLabel>

        {assignmentList?.map((el) => (
          <Card
            className=" mb-1 flex flex-col justify-between rounded-xl border-black p-5 text-left shadow-xl"
            key={el.id}
          >
            {' '}
            <Box className="fit-content m-1 flex justify-between bg-blue-200 p-2">
              <h4>{el.user.name}</h4>
            </Box>
            <br />
            <h6 className="fit-content m-1 bg-blue-200 p-2">{el.title}</h6>
            <h6 className="fit-content m-1 bg-blue-200 p-2">{el.question}</h6>
            <h6 className="fit-content m-1 bg-blue-200 p-2">{el.start_date}</h6>
            <h6 className="fit-content m-1 bg-blue-200 p-2">{el.end_date}</h6>
            <input
              type="file"
              accept="image/png, .svg"
              name="image"
              onChange={handleChangeTeacher}
            />
          </Card>
        ))}
      </Box>
    </div>
  );
}
