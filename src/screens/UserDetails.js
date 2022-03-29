import {
  IconButton,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogContent,
  TextField,
  DialogContentText,
  Button,
  Box,
  Avatar,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Form, FormikProvider, useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const [userData, setuserData] = useState(null);
  const params = useParams();

  // const BASE_URL = `https://jsonplaceholder.typicode.com/users/${params.userId}`;

  const BASE_URL = "http://localhost:4000/person";

  const fetchCreatedUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${params.userId}`, {
        withCredentials: true,
      });
      console.log(res.data.person);
      if (res.data) {
        console.log(res.data.person);
        setuserData(res.data.person);
      } else {
        console.log(res.data.person);

        alert(res.data.message || "An error occured");
      }
    } catch (err) {
      console.error("[fetchCreatedUsers]", err);
      alert("An error occured");
    }
  };

  useEffect(() => {
    fetchCreatedUsers();
  }, []);

  const heading = {
    color: "#000000",
    margin: 10,
    display: "flex",
    justifyContent: "flex-start",
    fontWeight: "bold",
  };
  const colon = {
    color: "#000000",
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    fontWeight: "bold",
  };

  const desc = {
    color: "black",
    margin: 10,
    display: "flex",
    justifyContent: "flex-start",
    fontWeight: "normal",
    wordWrap: "breakWord",
    // wordBreak: "break-all",
  };

  const btnnn = {
    fontSize: "large",
    display: "flex",
    justifyContent: "center",
    color: "black",
    marginBottom: "20px",
  };

  const back = {
    fontSize: "40px",
    marginBottom: 2,
    textAlign: "right",
    cursor: "pointer",
    "&:hover": {
      color: "#fefefe",
      background: "black",
    },
  };

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const editDetails = () => {
    console.log(userData);
    navigate(`edit`);
  };

  const deletePerson = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/${params.userId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.code === "00") {
        onClose();
        navigate(-1);
      } else {
        alert("Delete Request Failed");
      }
    } catch (err) {
      if (err.response.data.code === "A10") {
      } else {
        console.error("[deleteFunction]", err);
        alert("An error occured");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      delete: "",
    },
    onSubmit: deletePerson,
    enableReinitialize: true,
  });

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div>
        {userData && (
          <div>
            <Container>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={0}>
                        <Grid item xs={3} md={4}>
                          <IconButton size="large" style={btnnn}>
                            <ArrowBackIcon style={back} onClick={goBack} />
                          </IconButton>
                        </Grid>
                        <Grid item xs={6} md={4}>
                          <Typography
                            variant="h4"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              textTransform: "bold",
                              marginTop: "10px",
                              textAlign: "center",
                            }}
                          >
                            User Details
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={3}
                          md={4}
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <IconButton
                            size="large"
                            style={btnnn}
                            onClick={() => setOpen(true)}
                          >
                            <DeleteIcon style={back} />
                          </IconButton>
                          <IconButton
                            size="large"
                            style={btnnn}
                            onClick={editDetails}
                          >
                            <EditIcon style={back} />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <hr
                        style={{
                          marginTop: "0px",
                          marginBottom: "5px",
                          marginLeft: "5px",
                          marginRight: "5px",
                        }}
                      />

                      <Grid
                        container
                        spacing={0}
                        style={{ marginBottom: "10px" }}
                      >
                        <Grid item md={12} xs={12}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              width: "100%",
                            }}
                          >
                            <Box
                              sx={{
                                width: "250px",
                                height: "250px",
                                // marginLeft: "20px",
                              }}
                            >
                              <Avatar
                                src={
                                  userData?.profilePic
                                    ? `http://localhost:4000/${userData?.profilePic}`
                                    : "/static/mock-images/avatars/avatar_default.jpg"
                                }
                                alt="photoURL"
                                sx={{
                                  width: "250px",
                                  height: "250px",
                                  marginTop: "7px",
                                }}
                              />
                            </Box>
                          </div>
                        </Grid>
                      </Grid>

                      <Grid container spacing={0}>
                        <Grid item md={5} xs={5}>
                          <Typography style={heading}>Name </Typography>
                        </Grid>
                        <Grid item xs={2} style={colon}>
                          :
                        </Grid>

                        <Grid item md={5} xs={5}>
                          <Typography style={desc}>{userData.name}</Typography>
                        </Grid>
                      </Grid>

                      <Grid container spacing={0}>
                        <Grid item md={5} xs={5}>
                          <Typography style={heading}>Email </Typography>
                        </Grid>
                        <Grid item xs={2} style={colon}>
                          :
                        </Grid>
                        <Grid item md={5} xs={5}>
                          <Typography
                            style={{ ...desc, wordBreak: "break-all" }}
                          >
                            {userData.email}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={0}>
                        <Grid item md={5} xs={5}>
                          <Typography style={heading}>Mobile No. </Typography>
                        </Grid>
                        <Grid item xs={2} style={colon}>
                          :
                        </Grid>
                        <Grid item md={5} xs={5}>
                          <Typography style={desc}>
                            {userData.mobileNo}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid container spacing={0}>
                        <Grid item md={5} xs={5}>
                          <Typography style={heading}>Job Type </Typography>
                        </Grid>
                        <Grid item xs={2} style={colon}>
                          :
                        </Grid>
                        <Grid item md={5} xs={5}>
                          <Typography style={desc}>
                            {userData.jobType}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid container spacing={0}>
                        <Grid item md={5} xs={5}>
                          <Typography style={heading}>
                            Date of Birth{" "}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} style={colon}>
                          :
                        </Grid>
                        <Grid item md={5} xs={5}>
                          <Typography style={desc}>
                            {new Date(userData.dob).toLocaleDateString()}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid container spacing={0}>
                        <Grid item md={5} xs={5}>
                          <Typography style={heading}>
                            Preffered Location{" "}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} style={colon}>
                          :
                        </Grid>
                        <Grid item md={5} xs={5}>
                          <Typography style={desc}>
                            {userData.prefferedLocationChennai === true
                              ? "Chennai"
                              : "Not Mentioned"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </div>
        )}

        <Dialog
          open={open}
          keepMounted
          onClose={onClose}
          fullWidth="false"
          size="md"
        >
          <DialogContent>
            <DialogContentText style={{ color: "black", marginBottom: "10px" }}>
              <center>
                <b>Please type 'delete' to confirm!</b>
              </center>
            </DialogContentText>
            <Container>
              <FormikProvider value={formik}>
                <Form>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      name="delete"
                      label="Command"
                      id="delete"
                      onChange={formik.handleChange}
                      value={formik.values.delete}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>

                  <Grid item xs={12} md={12} sx={{ marginTop: "10px" }}>
                    <Button
                      disabled={formik.values.delete.toLowerCase() !== "delete"}
                      fullWidth
                      type="submit"
                      color="error"
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </Grid>
                </Form>
              </FormikProvider>
            </Container>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserDetails;
