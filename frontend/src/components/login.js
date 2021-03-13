import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import swal from 'sweetalert';

import '../styles/login.css'
import { useDispatch } from 'react-redux';
import {login} from '../redux/userSlice';

const Auth = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const dispatchLogin = status =>{
        dispatch(
            login({
                username: username,
                password: password,
                isLoggedIn: status,
            })
        );
    }

    const submitLogin = (e) => {
        e.preventDefault();
        const data = {
            email: username,
            password: password
        }

        if (username === "" || password === "") {
            swal("Please Enter Username and Password")
        }
        else {
            axios.post('http://localhost:4000/authenticate', {
                email: username,
                password: password
            }).then(response => {
                console.log(response);
                dispatchLogin(response.data.status);
                if (response.data.status === true) {
                    localStorage.setItem("Username", username);
                    swal("Success", "Login Successful", "success")
                } else {
                    swal("Error", "Login Unsuccessful", "error", {
                        dangerMode: true
                    });
                }
            })
                .catch(err => {
                    localStorage.setItem("Username", "");
                    swal("Error", "Unable to Login", "error");
                });
        }
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className='auth-paper'>
                <Avatar className='auth-avatar'>
                    <LockOutlinedIcon style={{ color: "green" }} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
              </Typography>
                <form className='auth-form' noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="uname"
                        label="User Name"
                        name="uname"
                        autoComplete="uname"
                        autoFocus
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className='auth-submit'
                        onClick={(e) => submitLogin(e)}
                    >
                        Sign In
                </Button>

                    <Grid container>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Auth;