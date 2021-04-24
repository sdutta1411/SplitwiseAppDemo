import React, { useState } from "react";
import { Divider, Avatar, Grid, Paper, Button } from "@material-ui/core";
import Moment from "moment";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const CommentPage = () => {
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
          to="/myGroups"
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
          {comments.map((value) => {
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
                      Posted on: {Moment(value.date).format("DD-MM-YYYY")}
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
          />
          <Button variant="contained" color="primary" size="small">
            Post
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CommentPage;
