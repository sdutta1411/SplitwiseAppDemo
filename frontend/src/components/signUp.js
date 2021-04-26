import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import swal from 'sweetalert';

import '../styles/signUp.css'

import { useDispatch } from 'react-redux';
import { register } from '../redux/userSlice';

const SignUp = () => {

  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currency, setCurrency] = useState("");
  const [timezone, setTimezone] = useState("");
  const [language, setLanguage] = useState("");
  const [redirect, setredirect] = useState(false);

  const dispatch = useDispatch();

  const dispatchRegister = status => {
    dispatch(
      register({
        username: name,
        email: email,
        password: password,
        phone: phone,
        currency: currency,
        timezone: timezone,
        language: language,
        isRegistered: status
      })
    );
  }

  const submitSignUp = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      currency: currency,
      timezone: timezone,
      language: language
    }

    axios.post('http://localhost:4000/api/user/register', data)
      .then(response => {
        debugger
        console.log(response);
        dispatchRegister(response.data.status);
        if (response.data.status === true) {
          swal("Success", "User Created Successfully", "success");
          setredirect(true);
        } else {
          swal("Error", "Unable to create User", "error", {
            dangerMode: true
          });
          setredirect(false);
        }
      })
      .catch(err => {
        console.log(err);
        swal("Error", "Error in User Creation", "error", {
          dangerMode: true
        });
        setredirect(false);
      });
  }


  if (redirect) {
    return <Redirect to='/login' />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className='signup-paper'>
        <Avatar className='signup-avatar'>
          <LockOutlinedIcon style={{ color: "green" }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className='signup-form' noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="name"
                label="Name"
                type="name"
                id="name"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="phone"
                name="phone"
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                autoFocus
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="currency"
                label="Currency"
                type="currency"
                id="currency"
                autoComplete="currency"
                onChange={(e) => setCurrency(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="timezone"
                name="timezone"
                variant="outlined"
                required
                fullWidth
                id="timezone"
                label="Timezone"
                autoFocus
                onChange={(e) => setTimezone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="language"
                label="Language"
                type="language"
                id="language"
                autoComplete="language"
                onChange={(e) => setLanguage(e.target.value)}
              />
            </Grid>
            <Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className='signup-submit'
                onClick={(e) => submitSignUp(e)}
              >
                Sign Up
          </Button>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default SignUp;