import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

const GroupPage = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            Group Page
        </div>
    )
};

export default GroupPage;