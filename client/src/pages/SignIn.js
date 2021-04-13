import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signInUser } from '../api/api';
import { authenticationByTouchId } from '../api/webAuthnApi';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  touchId: {
    margin: theme.spacing(0, 0, 2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignIn = () => {
  const classes = useStyles();
  const user = useSelector(state => state.currentUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const loginUser = useCallback(
    data => dispatch(signInUser(data)), [dispatch],
  );
  const loginUserByTouchId = useCallback(
    () => dispatch(authenticationByTouchId()), [dispatch],
  );

  useEffect(() => {
    if (user) {
      history.push('/home')
    }
  }, [user, history]);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //
  //   if (token && !user) {
  //     loginUser();
  //   }
  //
  // }, [user]);

  const onSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    loginUser(data);
  };

  return (
    // <>
    //   <FormWrapper
    //     pageName="Login"
    //     buttonText="Sign In"
    //     onSubmit={onSubmit}
    //   />
    //   <Button text="Use touchId for sign in" />
    // </>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Button
            type="button"
            onClick={loginUserByTouchId}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.touchId}
          >
            Sign in with touch id
          </Button>
        </form>
      </div>
    </Container>
  );
};
