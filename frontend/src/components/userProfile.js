import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Avatar, TextField, Grid, Button, Box, Divider, Typography } from '@material-ui/core';
import swal from 'sweetalert';

import man from '../assets/man.jpg';
import '../styles/userProfile.css';


const Profile = () => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         username: '',
    //         password: '',
    //         name: '',
    //         phoneNo: '',
    //         zipCode: '',
    //         email: '',
    //         role: '',
    //         temp_username: '',
    //         temp_name: '',
    //         temp_phoneNo: '',
    //         temp_email: '',
    //         currentPass: '',
    //         newPass: '',
    //     };
    // }

    // componentWillMount = () => {
    //     this.getUserInfo();
    // }

    // getUserInfo = () => {
    //     const uid = localStorage.getItem("Username");
    //     fetch(`http://54.71.77.44/api/user/${uid}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         this.setState({
    //             username: data.username,
    //             password: data.password,
    //             name: data.name,
    //             phoneNo: data.phoneNo,
    //             zipCode: data.zipCode,
    //             email: data.emailId,
    //             role: data.role,
    //             temp_username: data.username,
    //             temp_name: data.name,
    //             temp_phoneNo: data.phoneNo,
    //             temp_email: data.emailId,
    //         });
    //     })
    //     .catch(err => {
    //         console.log("Some error occured!");
    //     });
    //     console.log(this.username)
    // }

    // deleteAccount(uid) {
    //     const options = {
    //         method: "DELETE"
    //     };
    //     fetch(`http://54.71.77.44/api/user/${uid}`, options)
    //         .then((res) => {
    //             res.json();
    //             if (res.ok) {
    //                 localStorage.setItem("Username", "");
    //                 localStorage.setItem("accountType", "Guest");
    //                 swal("Success", "Deleted Account", "success").then(() => {
    //                     window.location = "http://54.71.77.44/";
    //                     window.location.reload();
    //                   })

    //             } else {
    //                 swal("Error", "Unable to delete account", "error", {
    //                     dangerMode: true
    //                 });
    //             }
    //         })
    //         .catch(err => {
    //             swal("Error", err, "error", {
    //                 dangerMode: true
    //             });
    //         });
    // }

    // updateUserInfo(uid) {
    //     const options = {
    //         method: "PATCH",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         //body: data,
    //         body: JSON.stringify({
    //             username: String(this.state.temp_username),
    //             name: String(this.state.temp_name),
    //             phoneNo: String(this.state.temp_phoneNo),              
    //             emailId: String(this.state.temp_email),
    //         })
    //     };
    //     fetch(`http://54.71.77.44/api/user/${uid}`, options)
    //         .then((res) => {
    //             res.json()
    //             if (res.ok) {
    //                 swal("Success", "User account successfully updated!", "success");
    //             } else {
    //                 swal("Error", "Unable to update account information.", "error", {
    //                     dangerMode: true
    //                 });
    //             }
    //         })
    //         .catch(err => {
    //             swal("Error", err, "error", {
    //                 dangerMode: true
    //             });
    //         });
    // }

    // cancleButton() {
    //     this.getUserInfo();
    //     this.setState({
    //         temp_username: this.state.username,
    //         temp_name: this.state.name,
    //         temp_email: this.state.email,
    //         temp_phoneNo: this.state.phoneNo,
    //     })   
    // }

    // checkCurrentPassword(password) {
    //     let check = this.state.password === password;
    //     return check;
    // }

    // validNewPassword(password) {
    //     let check = password > 6;
    //     return check;
    // }

    // updatePassword(uid, cur_pass, new_pass) {
    //     if (this.validNewPassword(new_pass) === true && this.checkCurrentPassword(cur_pass) === true) {
    //         const options = {
    //             method: "PATCH",
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({password: String(new_pass)})
    //         }
    //         fetch(`http://54.71.77.44/api/user/${uid}`, options)
    //             .then((res) => {
    //                 res.json()
    //                 if (res.ok) {
    //                     swal("Success", "Password successfully updated!", "success");
    //                 } else {
    //                     swal("Error", "Unable to update password.", "error", {
    //                         dangerMode: true
    //                     });
    //                 }
    //             })
    //             .catch(err => {
    //                 swal("Error", err, "error", {
    //                     dangerMode: true
    //                 });
    //             });
    //     } else {
    //         swal("Error", "Invalid password entires. Please check again.", "error", {
    //             dangerMode: true
    //         });
    //     }
    // }

    // render() {
    return (
        <div className="Profile">
            {/* <div style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 70, left: 30, right: 0, bottom: 0 }}>
                <Link to="/account" style={{ alignItems: 'center', display: 'flex', color: 'inherit', textDecoration: 'none' }}>
                    <Avatar className="Icon">
                        <ArrowBackIcon fontSize="inherit" />
                    </Avatar>
                    <body style={{ marginLeft: '.5rem' }}>Back to Account Settings</body>
                </Link>
            </div> */}
            <div style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 110, left: 60, right: 0, bottom: 0 }}>
                <h1>Profile</h1>
            </div>
            <div style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 160, left: 60 }}><h4>My Account</h4></div>
            <div style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 190, left: 30, right: 30, bottom: 0 }}>
                <Box m={4} p={1} border={1} css={{ height: 250 }}>
                    <Box display="flex">
                        <Box width="30%" m={3} >
                            <Grid container direction={"column"} justify="space-evenly" alignItems="center">
                                <Typography variant="h6">Role: </Typography>
                                <Avatar src={man} style={{ height: '150px', width: '150px' }} />
                                <Button sixe="large" color="primary" >Upload Image</Button>
                            </Grid>
                        </Box>
                        <Box width="40%" m={2} p={1} >
                            <form>
                                <Grid container justify="space-evenly" alignItems="center" spacing={9}>
                                    <Grid item>
                                        <TextField required id="outlined-username" label="Username" type="username" 
                                            variant="outlined"
                                            // onChange={(e) => this.setState({ temp_username: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField required id="outlined-name" label="Name" type="name" 
                                            variant="outlined"
                                            // onChange={(e) => this.setState({ temp_name: e.target.value })}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center" spacing={9}>
                                    <Grid item>
                                        <TextField required id="outlined-email" label="Email Address" type="email" 
                                            variant="outlined"
                                            // onChange={(e) => this.setState({ temp_email: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField required id="outlined-phone" label="Phone Number" type="phone" 
                                            variant="outlined"
                                            // onChange={(e) => this.setState({ temp_phoneNo: e.target.value })}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container justify="center" alignItems="center" spacing={5}>
                                    <Grid item>
                                        <Button color="primary" variant="outlined" >Cancle Update</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button color="primary" variant="outlined">Save Update</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </div>
            <div style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 490, left: 30, right: 30, bottom: 0 }}>
                <Box m={4} p={3} border={1} css={{ height: 230 }}>
                    <h3>MANAGE ACCOUNT</h3>
                    <Grid container justify="space-evenly" alignItems="center" spacing={2}>
                        <Grid item xs={3}>
                            <h4>Change Password</h4>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="outlined-password-input"
                                label="Current Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                // onChange={(e) => this.setState({ currentPass: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="outlined-password-input"
                                label="New Password"
                                type="password"
                                autoComplete="new-password"
                                variant="outlined"
                                // onChange={(e) => this.setState({ newPass: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button color="primary" variant="outlined">Update Password</Button>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container display="flex" justify="space-evenly" alignItems="center" spacing={2} >
                        <Grid item xs={9}>
                            <h4>Delete Account</h4>
                            <subtitle2>Your account will be permanently deleted.</subtitle2>
                        </Grid>
                        <Grid item xs={3}>
                            <Button color="primary" variant="outlined" >Delete Account</Button>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    )
}


export default Profile;