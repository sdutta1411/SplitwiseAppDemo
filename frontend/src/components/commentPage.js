import React, { useState, useEffect } from "react";
import { Divider, Avatar, Grid, Paper, Button } from "@material-ui/core";
import Moment from "moment";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "axios";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";

const CommentPage = () => {
  const location = useLocation();

  const GroupName = location.pathname.split("/")[2];
  const expenseId = location.pathname.split("/")[3];

  const [content, setContent] = useState("");
  const [myComments, setmyComments] = useState([]);

  useEffect(() => {
    getAllComments();
  }, []);

  const comments = [
    {
      expense_id: "1",
      created_by: "Shubham Dutta",
      content: "Hello World",
      created_at: "2019-08-24T14:15:22Z",
    },
    {
      expense_id: "2",
      created_by: "Sumita Dutta",
      content: "Hello World",
      created_at: "2019-08-24T14:15:22Z",
    },
    {
      expense_id: "3",
      created_by: "Nilu Dutta",
      content: "Hello World",
      created_at: "2019-08-24T14:15:22Z",
    },
  ];

  const saveComment = (e) => {
    e.preventDefault();
    debugger;
    const data = {
      expense_id: expenseId,
      created_by: localStorage.Username,
      content: content,
    };

    axios
      .post("http://localhost:4000/api/comments/postcomment", data)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          swal("Success", "Comment Posted", "success").then(() => {
            window.location.reload();
          });
        } else {
          swal("Error", "Unable Post Comment", "error", {
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

  const getAllComments = () => {
    debugger;
    axios
      .post("http://localhost:4000/api/comments/getcomment", {
        expense_id: expenseId,
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          setmyComments(response.data);
        } else {
          swal("Error", "Unable Post Comment", "error", {
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

  return (
    <div style={{ padding: 14, marginLeft: 120 }} className="App">
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 70,
          left: 100,
          right: 0,
          bottom: 0,
        }}
      >
        <Link
          to={`/myGroups/${GroupName}`}
          style={{
            alignItems: "center",
            display: "flex",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Avatar className="Icon">
            <ArrowBackIcon fontSize="inherit" />
          </Avatar>
        </Link>
      </div>
      <h1>Comments</h1>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          {myComments.map((value) => {
            return (
              <Paper
                style={{
                  padding: "30px 10px",
                  marginTop: 30,
                  width: "400px",
                  height: "150px",
                }}
              >
                <Grid container wrap="wrap" spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp" />
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>
                      {value.created_by}
                    </h4>
                    <p style={{ textAlign: "left" }}>{value.content} </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                      Posted on: {Moment(value.created_at).format("DD-MM-YYYY")}
                    </p>
                  </Grid>
                  <Button className="mr10">X</Button>
                </Grid>
              </Paper>
            );
          })}
        </Grid>
        <Grid item xs={6}>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={3}
            placeholder="Comment"
            autoFocus
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={(e) => saveComment(e)}
          >
            Post
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CommentPage;
