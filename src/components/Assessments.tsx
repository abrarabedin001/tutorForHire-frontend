import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import { styled } from '@mui/material/styles';

import {
  FaCloudDownloadAlt,
  FaCloudUploadAlt,
  FaTrashAlt,
} from 'react-icons/fa';
import {
  Card,
  CardContent,
  IconButton,
  type IconButtonProps,
} from '@mui/material';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import StudentAnswerGrid from './StudentAnswerGrid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StudentExpand from './StudentExpand';
import { useRouter } from 'next/router';

export default function Assessments({
  id,
  isTeacher,
}: {
  id: string;
  isTeacher: boolean;
}) {
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
  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  const router = useRouter();

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
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

  const deleteAssignment = async (id) => {
    try {
      console.log('delete student');
      const link = 'http://localhost:5000/classroom/deleteques/' + id;
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
    setAssignmentChange(assignmentChange + 1);
  };

  const onSubmit = async () => {
    try {
      console.log('enters');
      console.log(assignment, assignment_name, start_date, end_date);
      console.log();
      const link = 'http://localhost:5000/classroom/createques';

      // console.log({ courseId: id, comment: comment });
      const response_assignment = await axios.post(
        link,
        {
          title: assignment_name,
          question: assignment,
          marks: '10',
          start_date: start_date,
          end_date: end_date,
          courseId: id,
          files: file,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `token ${cookies.data.token}`,
          },
        },
      );
      console.log(response_assignment.data);
      setAssignmentChange(assignmentChange + 1);
      setAssignment('');
      setStart_Date(0);
      setEnd_Date(0);
      setAssignment('');
      setAssignmentName('');
      setFile(null);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChangeTeacher = async (id) => {
    console.log('file:', file);
    console.log(id);
    try {
      let link = '';
      console.log('Not');
      if (cookies.data.user.type === 'STUDENT') {
        link = 'http://localhost:5000/classroom/createans';
      } else {
        link = 'http://localhost:5000/classroom/createans';
      }
      console.log('link', { file: file });
      const user = await axios.post(
        link,
        { answer: 'answer', quesId: id, files: file },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `token ${cookies.data.token}`,
          },
        },
      );
      console.log(user.res);
      setAssignmentChange(assignmentChange + 1);
      // await router.push('/home');
    } catch (err) {
      console.log(err.message);
    }
  };
  const answersfunct = (answer) => {
    console.log('answer');
    console.log(answer);
    const mappedAnswers = answer.filter(
      (answer) => answer.user.id == cookies?.data?.user?.id,
    );
    console.log('mappedAnswers', mappedAnswers);
    return mappedAnswers.length == 0;
  };

  console.log('assignment', assignmentList);
  return (
    <div className="flex  w-full flex-col rounded bg-white/20 p-5">
      {isTeacher ? (
        <FormControl sx={{ width: '100%' }}>
          <FormLabel style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            Assignment
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
                <input
                  type="file"
                  name="files"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
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
      ) : (
        ' '
      )}

      <Box sx={{ mt: 2 }}>
        <FormLabel></FormLabel>

        {assignmentList?.map((el) => (
          <Card key={el.id} className="mb-4 rounded-lg border bg-gray-100">
            <CardContent>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {el.user?.TeacherProfile?.image ? (
                    <img
                      src={`http://localhost:5000/images/${el.user.TeacherProfile.image}`}
                      alt=""
                      className="h-12 w-12 rounded-full"
                    />
                  ) : (
                    <img
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      className="h-12 w-12 rounded-full"
                      alt="teacher"
                    />
                  )}
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-gray-700">
                      {el.user.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Posted on: {el.start_date.split('T')[0]}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <button
                      className="m-1 ml-auto flex items-center rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 focus:outline-none"
                      onClick={() => deleteAssignment(el.id)}
                    >
                      <FaTrashAlt className="mr-1" />
                      <span>Delete</span>
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Due Date: {el.end_date.split('T')[0]}
                  </p>
                </div>
              </div>

              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                Assignment: {el.title}
              </h3>

              <p className="text-base text-gray-600">{el.question}</p>
            </CardContent>

            <div className="mt-4 flex items-center justify-between p-2">
              <div className="ml-2 flex items-center space-x-2">
                {el.file && (
                  <a
                    className="flex items-center justify-center"
                    href={`http://localhost:5000/files/${el.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaCloudDownloadAlt className="text-blue-500" />
                    <span className="ml-1 font-medium text-gray-600">
                      Download Assignment
                    </span>
                  </a>
                )}
              </div>

              {el.end_date.split('T')[0] >
              new Date().toISOString().split('T')[0] ? (
                answersfunct(el.Answer) ? (
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor={`file-upload-${el.id}`}
                      className="flex cursor-pointer items-center space-x-2"
                    >
                      <FaCloudUploadAlt className="text-blue-500" />
                      <span className="font-medium text-gray-600">
                        Upload Assignment Script
                      </span>
                      <input
                        type="file"
                        id={`file-upload-${el.id}`}
                        name="files"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <button
                      className="m-1 rounded  bg-blue-600 p-1 text-white transition duration-300 hover:bg-blue-700"
                      onClick={() => handleChangeTeacher(el.id)}
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  ' '
                )
              ) : (
                ' '
              )}
            </div>

            {isTeacher ? (
              <CardContent>
                <StudentExpand el={el} />
              </CardContent>
            ) : (
              ''
            )}
          </Card>
        ))}
      </Box>
    </div>
  );
}
