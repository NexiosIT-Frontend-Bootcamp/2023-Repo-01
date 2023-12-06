import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
// import { useMutation } from '@tanstack/react-query';
// import { LoginUser } from '../../types/loginUser';
// import { loginUser } from '../../api/authService';
// import { AxiosError } from 'axios';
import { useUserContext } from '../../contexts/useUserContext';

export interface IError{
    message: string;
}
const defaultTheme = createTheme();

export default function Login() {
    const { signIn } = useUserContext();
    const [errorMessage, setErrorMessage] = useState('');
    // const {mutate: loginMutation} = useMutation({mutationFn: (user: LoginUser) => loginUser(user), onError: (error: AxiosError<IError>) => {
    //     console.log(error);
    //     const data = error.response?.data ;
    //     setErrorMessage(data?.message??'');
    // }
    // });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    console.log({
      email: email,
      password: password,
    });
    if (email === '' || email === undefined || password === '' || password === undefined) {
        setErrorMessage('All fields are required to fill in')
        return
    }
    signIn(email, password)
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <span style={{color: 'red'}}>
            {errorMessage}
          </span>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}