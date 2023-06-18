import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { signIn, signOut, useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type RouterOutputs } from '~/utils/api';
import { TextField } from '@mui/material';
import '@fontsource/roboto/700.css';
// import { trpc } from "../utils/trpc";

type Todo = RouterOutputs['task']['getAll'][0];

const Todo = () => {
  const utils = api.useContext();

  const ref = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState(true);

  // const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = api.auth.insert.useMutation();

  return (
    <Box
      sx={{ minWidth: 275 }}
      className=" flex flex-col items-center justify-center p-5 sm:w-full"
    >
      <Card
        variant="outlined"
        className=" flex flex-col items-center justify-center pt-5"
      >
        <Typography className="pt-3" variant="h4" component="h4">
          {' '}
          Sign Up{' '}
        </Typography>
        <CardContent className=" m-3 mt-5 flex flex-col items-center justify-center sm:w-full">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            margin="normal"
          />

          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            margin="normal"
          />

          <TextField
            id="outlined-basic"
            label="Repeat Password"
            variant="outlined"
            margin="normal"
          />
          <CardActions>
            <Button size="small" variant="contained">
              <p className="font-bold">Sign Up</p>
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Todo;
