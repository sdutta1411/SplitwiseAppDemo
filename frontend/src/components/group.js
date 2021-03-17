import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
        marginLeft: 100,
    },
}));

const Group = () => {
    const classes = useStyles();

    const [newGroupRedirect, setnewGroupRedirect] = useState(false);
    const [myGroupsRedirect, setmyGroupsRedirect] = useState(false);

    const handleNewGroupClick = (event, index) => {
        setnewGroupRedirect(true);
    };

    const handleMyGroupsClick = (event, index) => {
        setmyGroupsRedirect(true);
    };

    if (newGroupRedirect) {
        return (<div>
            <Redirect to='/newGroup' />
        </div>);
    } else if (myGroupsRedirect) {
        return (<div>
            <Redirect to='/myGroups' />
        </div>);
    }
    else {
        return (
            <div className={classes.root}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<GroupAddIcon />}
                    onClick={handleNewGroupClick}
                >
                    New Group
          </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<GroupWorkIcon />}
                    onClick={handleMyGroupsClick}
                >
                    My Groups
          </Button>
            </div>
        );
    }
}

export default Group;