import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupIcon from '@material-ui/icons/Group';
import FlagIcon from '@material-ui/icons/Flag';
import { Redirect } from 'react-router';
import swal from 'sweetalert';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function Navbar() {
    const classes = useStyles();

    const [selectedIndex, setSelectedIndex] = useState();
    const [profileRedirect, setprofileRedirect] = useState(false);
    const [dashboardRedirect, setdashboardRedirect] = useState(false);
    const [groupRedirect, setgroupRedirect] = useState(false);

    let username = localStorage.Username;

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handleProfileItemClick = (event, index) => {
        setSelectedIndex(index);
        setprofileRedirect(true);
    };

    const handleDashboardItemClick = (event, index) => {
        setSelectedIndex(index);
        setdashboardRedirect(true);
    };

    const handleGroupItemClick = (event, index) => {
        setSelectedIndex(index);
        setgroupRedirect(true);
    };

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logout = () => {
        localStorage.setItem("UserDetails", "");
        localStorage.setItem("Email", "");
        localStorage.setItem("Username", "");
        swal("Success", "Logged Out", "success")
            .then(() => {
                window.location.reload();
            })
    }

    if (dashboardRedirect) {
        return (<div>
            <Navbar />
            <Redirect to='/dashboard' />
        </div>);
    }
    else if (profileRedirect) {
        return (<div>
            <Navbar />
            <Redirect to='/userProfile' />
        </div>);
    }
    else if (groupRedirect) {
        return (<div>
            <Navbar />
            <Redirect to='/group' />
        </div>);
    }
    else {
        return (
            < div className={classes.root} >
                <CssBaseline />
                <AppBar position="static"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            <Button color="inherit" href="/">Home</Button>
                        </Typography>
                        {username.length == 0 &&
                            <Button color="inherit" href="/login">Login</Button>
                        }
                        {username.length > 0 &&
                            <Button color="inherit" onClick={() => logout()}>Logout</Button>
                        }
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem
                            button
                            selected={selectedIndex === 0}
                            onClick={(event) => handleDashboardItemClick(event, 0)}
                        >
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem
                            button
                            selected={selectedIndex === 1}
                            onClick={(event) => handleProfileItemClick(event, 1)}
                        >
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem
                            button
                            selected={selectedIndex === 2}
                            onClick={(event) => handleGroupItemClick(event, 2)}
                        >
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Group" />
                        </ListItem>
                        <ListItem
                            button
                            selected={selectedIndex === 3}
                            onClick={(event) => handleListItemClick(event, 3)}
                        >
                            <ListItemIcon>
                                <FlagIcon />
                            </ListItemIcon>
                            <ListItemText primary="Recent Activity" />
                        </ListItem>
                    </List>
                </Drawer>
            </div>
        );
    }
}
