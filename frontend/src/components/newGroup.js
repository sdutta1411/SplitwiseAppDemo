import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import GroupIcon from '@material-ui/icons/Group';
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';
import axios from 'axios';

import logo from '../assets/splitwiseLogo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 50,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

const NewGroup = () => {
    const classes = useStyles();

    const [inputList, setInputList] = useState([{ email: "" }]);
    const [groupName, setGroupName] = useState("");

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { email: "" }]);
    };

    const saveGroup = (e) => {
        e.preventDefault();
        let inputListnew = [...inputList, {email:localStorage.Email}];
        const data = {
            groupName: groupName,
            emailList: inputListnew,
            status: 'Awaiting',
        }

        axios.post('http://localhost:4000/creategroup', data)
            .then(response => {
                if (response.data.status === true) {
                    swal("Success", "Group Created Successfully", "success")
                    .then(() => {
                            window.location.reload();
                        })
                } else {
                    swal("Error", "Unable to Create Group", "error", {
                        dangerMode: true
                    });
                }
            })
            .catch(err => {
                console.log(err);
                swal("Error", "Error in Group Creation", "error", {
                    dangerMode: true
                });
            });
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={logo} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    START A NEW GROUP
                               </Typography>
                                <Divider />
                            </Grid>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <GroupIcon />
                                </Grid>
                                <Grid item>
                                    <TextField id="input-with-icon-grid" label="Group Name"
                                        onChange={(e) => setGroupName(e.target.value)} />
                                </Grid>
                            </Grid>
                            <br />
                            <Divider />
                            <br />
                            <Grid item>
                                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                    GROUP MEMBERS
                               </Typography>
                            </Grid>
                            <Grid item>
                                {inputList.map((x, i) => {
                                    return (
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <TextField id="email"
                                                    label="Email Address"
                                                    name="email" type="email"
                                                    variant="outlined"
                                                    value={x.email}
                                                    onChange={e => handleInputChange(e, i)}
                                                />
                                            </Grid>
                                            <Grid item>
                                                {inputList.length !== 1 && <Button
                                                    className="mr10"
                                                    onClick={() => handleRemoveClick(i)}>X</Button>}
                                            </Grid>
                                            <Grid item>
                                                {inputList.length - 1 === i && <Button onClick={handleAddClick}>+ Add a Person</Button>}
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                    onClick={(e) => saveGroup(e)}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default NewGroup;