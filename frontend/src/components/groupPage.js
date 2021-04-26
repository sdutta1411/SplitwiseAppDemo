import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import { Divider, TextField } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router";
import Moment from "moment";
import CommentIcon from "@material-ui/icons/Comment";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
  },
  cardRoot: {
    maxWidth: 1000,
    marginLeft: 150,
    marginTop: 50,
  },
  paperModal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const GroupPage = (props) => {
  const classes = useStyles();

  const location = useLocation();

  const GroupName = location.pathname.split("/")[2];

  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);

  const [amount, setAmount] = useState(0.0);
  const [description, setDescription] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const expenses = [
    {
      username: "Shubham Dutta",
      description: "Test-1",
      amount: 60.05,
      creationDate: "2020-03-17",
    },
    {
      username: "Sumita Dutta",
      description: "Test-2",
      amount: 80.15,
      creationDate: "2020-03-17",
    },
  ];

  const rand = () => {
    return Math.round(Math.random() * 20) - 10;
  };

  const getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  };

  const [modalStyle] = useState(getModalStyle);

  const [myExpenses, setmyExpenses] = useState([]);
  const [fetchStatus, setfetchStatus] = useState(true);
  const [redirect, setredirect] = useState(false);

  useEffect(() => {
    getAllExpenses();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatDate = () => {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
  };

  const splitamount = (amount) => {
    debugger;
    const data = {
      groupname: GroupName,
      payeremail: localStorage.Email,
      amount: amount,
    };
    axios
      .post("http://localhost:4000/api/amountsplit/createsplit", data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveExpense = (e) => {
    e.preventDefault();
    const data = {
      group_name: GroupName,
      user_email: localStorage.Email,
      user_name: localStorage.Username,
      amount: amount,
      description: description,
    };

    axios
      .post("http://localhost:4000/api/expense/addexpense", data)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          swal("Success", "Expense Added", "success").then(() => {
            window.location.reload();
          });
          splitamount(amount);
          handleClose();
        } else {
          swal("Error", "Unable to add Expense", "error", {
            dangerMode: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        swal("Error", "Error in Addition", "error", {
          dangerMode: true,
        });
      });
  };

  const body = (
    <div style={modalStyle} className={classes.paperModal}>
      <h2 id="simple-modal-title">Add Expenses</h2>
      <Divider />
      <p id="simple-modal-description">
        <TextField label="Amount" onChange={(e) => setAmount(e.target.value)} />
        <TextField
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </p>
      <Divider />
      <Button
        variant="contained"
        color="secondary"
        size="small"
        className={classes.button}
        onClick={() => handleClose()}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={(e) => saveExpense(e)}
      >
        Save
      </Button>
    </div>
  );

  const getAllExpenses = () => {
    debugger;
    fetch(`http://localhost:4000/api/expense/${GroupName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          const allExpenses = data.data;
          setmyExpenses(allExpenses);
        } else {
          setfetchStatus(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const leaveGroup = () => {
    let leave = false;

    axios
      .post("http://localhost:4000/api/amountsplit/getsummary", {
        payee: localStorage.Email,
      })
      .then((response) => {
        if (response.data.data.length == 0) {
          const data = {
            group_name: GroupName,
            user_name: localStorage.Email,
            deletion: true,
          };

          axios
            .post("http://localhost:4000/api/group/changestatus", data)
            .then((response) => {
              console.log(response);
              if (response.status == 200) {
                swal("Success", "Left Group", "success");
                setredirect(true);
              } else {
                swal("Error", "Error", "error", {
                  dangerMode: true,
                });
              }
            })
            .catch((err) => {
              console.log(err);
              swal("Error", "Error", "error", {
                dangerMode: true,
              });
            });
        } else {
          swal("Error", "Settle All Balances", "error", {
            dangerMode: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (redirect) {
    return <Redirect to="/myGroups" />;
  }

  return (
    <div>
      <Card className={classes.cardRoot}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          onClick={() => leaveGroup()}
        >
          Leave Group
        </Button>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <GroupWorkIcon />
            </Avatar>
          }
          action={
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<AddCircleIcon />}
              onClick={() => handleOpen()}
            >
              Add Expenses
            </Button>
          }
          title={GroupName}
        />
        <CardContent>
          {myExpenses.map((value) => {
            return (
              <List className={classes.root}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ShoppingCartIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={value.description}
                    secondary={Moment(value.date).format("DD-MM-YYYY")}
                  />
                  <ListItemText
                    primary={value.user_name}
                    secondary={value.amount}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<CommentIcon />}
                    component={Link}
                    to={`/commentpage/${value.group_name}/${value._id}`}
                  />
                </ListItem>
                <Divider />
              </List>
            );
          })}
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default GroupPage;
