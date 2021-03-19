import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginLeft: 150,
        marginTop: 50,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const MyGroups = () => {
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const classes = useStyles();

    const [myGroups, setmyGroups] = useState([]);
    const [fetchStatus, setfetchStatus] = useState(true);

    useEffect(() => {
        getAllGroups();
    }, []);

    const getAllGroups = () => {
        axios.post('http://localhost:4000/fetchgroups', {
            email: localStorage.Email
        }).then(response => {
            if (response.data.status === true) {
                const allgroups = response.data.data;
                setmyGroups(allgroups);
            } else {
                setfetchStatus(false);
            }
        })
            .catch(err => {
                console.log(err)
            });
    }

    if (!fetchStatus) {
        return (
            <div className={classes.root}>
                <h2>No Groups Yet</h2>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            {myGroups.map((value) => {
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper}>
                                <Accordion square expanded={true} onChange={handleChange('panel1')}>
                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                        <Grid item>
                                            <Avatar>G</Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography>{value.groupname}</Typography>
                                        </Grid>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                                {value.userstatus == 'Confirmed' && <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="medium"
                                                    component={Link}
                                                    to={`/groupPage/${value.groupname}`}
                                                >
                                                    Group Page
                                            </Button>}
                                            {value.userstatus == 'Awaiting' &&
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="medium">
                                                    Accept
                                            </Button>
                                            }
                                            {value.userstatus == 'Awaiting' &&
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="medium">
                                                    Delete
                                            </Button>
                                            }
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Paper>
                        </Grid>
                    </Grid>
                )
            })}
        </div>
    );


}

export default MyGroups;