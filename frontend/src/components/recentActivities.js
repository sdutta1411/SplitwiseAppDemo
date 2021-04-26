import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import BallotIcon from "@material-ui/icons/Ballot";
import axios from "axios";
import Moment from "moment";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    backgroundColor: theme.palette.background.paper,
    marginLeft: "500",
  },
  inline: {
    display: "inline",
  },
  cardroot: {
    width: 1000,
    minWidth: 275,
    marginLeft: 150,
    marginTop: 50,
  },
}));

const RecentActivities = () => {
  const classes = useStyles();

  const [myActivities, setmyActivities] = useState([]);

  useEffect(() => {
    getRecentActivities();
  }, []);

  const getRecentActivities = () => {
    debugger;
    axios
      .post("http://localhost:4000/api/expense/getrecentactivities", {
        email: localStorage.Email,
      })
      .then((response) => {
        if (response.data.status === true) {
          const allactivities = response.data.data;
          setmyActivities(allactivities);
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (e) => {

  };

  return (
    <Card className={classes.cardroot}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <NotificationsActiveIcon />
          </Avatar>
        }
        title="Recent Actiivites"
      />
      <Divider />
      <CardContent>
        <Pagination
          className="my-3"
          count={3}
          page={3}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={e => handlePageChange(e)}
        />
        {myActivities.map((value) => {
          return (
            <List className={classes.root}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>
                    <BallotIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${value.user_name} added "${value.description}" in "${value.group_name}"`}
                  secondary={Moment(value.date).format("DD-MM-YYYY")}
                />
                <ListItemText secondary={`$ ${value.amount}`} />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
