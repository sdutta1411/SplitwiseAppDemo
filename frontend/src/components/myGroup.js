import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
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
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const MyGroups = () => {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const classes = useStyles();

  const [myGroups, setmyGroups] = useState([]);
  const [fetchStatus, setfetchStatus] = useState(true);

  useEffect(() => {
    getAllGroups();
  }, []);

  const fetchGroupData = (allgroupsData) => {
    let myGroupsArr = [];
    for (let i = 0; i < allgroupsData.length; i++) {
      const members = allgroupsData[i].members;
      for (let j = 0; j < members.length; j++) {
        if (members[j].user_name == localStorage.Email) {
          const groups = {
            group_name: allgroupsData[i].group_name,
            user_name: members[j].user_name,
            user_status: members[j].user_status,
          };
          myGroupsArr = [...myGroupsArr, groups];
        }
      }
    }
    setmyGroups(myGroupsArr);
  };

  const getAllGroups = () => {
    const data = {
      user_name: localStorage.Email,
    };
    debugger;
    axios
      .post(`http://3.235.179.11:4000/api/group/getGroup`, data)
      .then((data) => {
        debugger;
        if (data.status == 200) {
          const allgroupsData = data.data;
          fetchGroupData(allgroupsData);
        } else {
          setfetchStatus(false);
        }
      })
      .catch((err) => {
        debugger;
        console.log(err);
      });
  };

  const changeStatus = (groupname) => {
    debugger;
    const data = {
      group_name: groupname,
      user_name: localStorage.Email,
    };

    axios
      .post("http://3.235.179.11:4000/api/group/changestatus", data)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          swal("Success", "Group Invitation Accepted", "success").then(() => {
            window.location.reload();
          });
        } else {
          swal("Error", "Error in Addition to Group", "error", {
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

  const deleteInvitation = (groupname) => {
    const data = {
      group_name: groupname,
      user_name: localStorage.Email,
      deletion: true,
    };

    axios
      .post("http://3.235.179.11:4000/api/group/changestatus", data)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          swal("Success", "Group Invitation Rejected", "success").then(() => {
            window.location.reload();
          });
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
  };

  if (!fetchStatus) {
    return (
      <div className={classes.root}>
        <h2>No Groups Yet</h2>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {myGroups.map((value) => {
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Accordion
                  square
                  expanded={true}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Grid item>
                      <Avatar>G</Avatar>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Typography>{value.group_name}</Typography>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {value.user_status == "Confirmed" && (
                        <Button
                          variant="contained"
                          color="primary"
                          size="medium"
                          component={Link}
                          to={`/groupPage/${value.group_name}`}
                        >
                          Group Page
                        </Button>
                      )}
                      {value.user_status == "Awaiting" && (
                        <Button
                          variant="contained"
                          color="primary"
                          size="medium"
                          onClick={() => changeStatus(value.group_name)}
                        >
                          Accept
                        </Button>
                      )}
                      {value.user_status == "Awaiting" && (
                        <Button
                          variant="contained"
                          color="primary"
                          size="medium"
                          onClick={() => deleteInvitation(value.group_name)}
                        >
                          Delete
                        </Button>
                      )}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};

export default MyGroups;
