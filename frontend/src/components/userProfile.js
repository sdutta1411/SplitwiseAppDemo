import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  Avatar,
  TextField,
  Grid,
  Button,
  Box,
  Divider,
  Typography,
} from "@material-ui/core";
import swal from "sweetalert";
import axios from "axios";

import man from "../assets/man.jpg";
import "../styles/userProfile.css";

const Profile = () => {
  //let userdetails = JSON.parse(localStorage.UserDetails);

  const [name, setName] = useState(localStorage.Username);
  const [email, setEmail] = useState(localStorage.Email);
  const [phone, setPhone] = useState(localStorage.Phone);
  const [currency, setCurrency] = useState(localStorage.Currency);
  const [timezone, setTimezone] = useState(localStorage.Timezone);
  const [language, setLanguage] = useState(localStorage.Language);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    const uid = localStorage.getItem("Email");
    fetch(`http://localhost:4000/api/user/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        setEmail(data.email);
        setName(data.name);
        setPhone(data.phone);
        setCurrency(data.currency);
        setTimezone(data.timezone);
        setLanguage(data.language);
      })
      .catch((err) => {
        console.log("Some error occured!");
      });
  };

  const saveUserDetails = (e) => {
    e.preventDefault();
    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        currency: currency,
        timezone: timezone,
        language: language,
      }),
    };

    const uid = localStorage.getItem("UserId");
    fetch(`http://localhost:4000/api/user/${uid}`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status == true) {
          swal("Success", response.message, "success");
          localStorage.setItem("Username", name);
          localStorage.setItem("Phone", phone);
          localStorage.setItem("Currency", currency);
          localStorage.setItem("Timezone", timezone);
          localStorage.setItem("Language", language);
        } else {
          swal("Error", "Unable to update UserDetails", "error", {
            dangerMode: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        swal("Error", "Error in Updation", "error", {
          dangerMode: true,
        });
      });
  };

  return (
    <div className="Profile">
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 110,
          left: 100,
          right: 0,
          bottom: 0,
        }}
      >
        <h1>Profile</h1>
      </div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 160,
          left: 100,
        }}
      >
        <h4>My Account</h4>
      </div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 190,
          left: 30,
          right: 30,
          bottom: 0,
        }}
      >
        <Box m={4} p={1} border={1} css={{ height: 450 }}>
          <Box display="flex">
            <Box width="30%" m={3}>
              <Grid
                container
                direction={"column"}
                justify="space-evenly"
                alignItems="center"
              >
                <Avatar src={man} style={{ height: "150px", width: "150px" }} />
                <Button sixe="large" color="primary">
                  Upload Image
                </Button>
              </Grid>
            </Box>
            <Box width="40%" m={2} p={1}>
              <form>
                <Grid
                  container
                  justify="space-evenly"
                  alignItems="center"
                  spacing={9}
                >
                  <Grid item>
                    <TextField
                      id="name"
                      label="Name"
                      type="name"
                      variant="outlined"
                      defaultValue={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="email"
                      label="Email Address"
                      type="email"
                      variant="outlined"
                      defaultValue={email}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  justify="space-evenly"
                  alignItems="center"
                  spacing={9}
                >
                  <Grid item>
                    <TextField
                      id="phone"
                      label="Phone Number"
                      type="phone"
                      variant="outlined"
                      defaultValue={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="currency"
                      label="Currency"
                      type="currency"
                      variant="outlined"
                      defaultValue={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  justify="space-evenly"
                  alignItems="center"
                  spacing={9}
                >
                  <Grid item>
                    <TextField
                      id="timezone"
                      label="Timezone"
                      type="timezone"
                      variant="outlined"
                      defaultValue={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="language"
                      label="Language"
                      type="language"
                      variant="outlined"
                      defaultValue={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Box>
      </div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 490,
          left: 30,
          right: 30,
          bottom: 0,
        }}
      >
        <Box m={4} p={3} border={1} css={{ height: 230 }}>
          <Grid container justify="center" alignItems="center" spacing={5}>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                component={Link}
                to="/dashboard"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={(e) => saveUserDetails(e)}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Profile;
