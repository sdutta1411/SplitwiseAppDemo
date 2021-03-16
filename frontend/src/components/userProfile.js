import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Avatar, TextField, Grid, Button, Box, Divider, Typography } from '@material-ui/core';
import swal from 'sweetalert';

import man from '../assets/man.jpg';
import '../styles/userProfile.css';


const Profile = () => {

    return (
        <div className="Profile">
            <div style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 110, left: 100, right: 0, bottom: 0 }}>
                <h1>Profile</h1>
            </div>
            <div style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 160, left: 100 }}><h4>My Account</h4></div>
            <div style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 190, left: 30, right: 30, bottom: 0 }}>
                <Box m={4} p={1} border={1} css={{ height: 450 }}>
                    <Box display="flex">
                        <Box width="30%" m={3} >
                            <Grid container direction={"column"} justify="space-evenly" alignItems="center">
                                <Avatar src={man} style={{ height: '150px', width: '150px' }} />
                                <Button sixe="large" color="primary" >Upload Image</Button>
                            </Grid>
                        </Box>
                        <Box width="40%" m={2} p={1} >
                            <form>
                                <Grid container justify="space-evenly" alignItems="center" spacing={9}>
                                    <Grid item>
                                        <TextField required id="name" label="Name" type="name"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField required id="email" label="Email Address" type="email"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center" spacing={9}>
                                    <Grid item>
                                        <TextField required id="phone" label="Phone Number" type="phone"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField required id="currency" label="Currency" type="currency"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center" spacing={9}>
                                    <Grid item>
                                        <TextField required id="timezone" label="Timezone" type="timezone"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField required id="language" label="Language" type="language"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </div>
            <div style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 490, left: 30, right: 30, bottom: 0 }}>
                <Box m={4} p={3} border={1} css={{ height: 230 }}>
                    <Grid container justify="center" alignItems="center" spacing={5}>
                        <Grid item>
                            <Button color="primary" variant="outlined" >Cancle Update</Button>
                        </Grid>
                        <Grid item>
                            <Button color="primary" variant="outlined">Save Update</Button>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    )
}


export default Profile;