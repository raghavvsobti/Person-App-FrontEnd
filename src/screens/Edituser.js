import {
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Avatar,
  Typography,
  Slide,
  Dialog,
  DialogTitle,
  DialogActions,
  Tooltip,
  Fade,
  IconButton,
} from "@material-ui/core";
import { DatePicker, LocalizationProvider } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    marginBottom: "40px",
    display: "flex",
    justifyContent: "center",
    color: "#000",
  },
  inputs: {
    width: "100%",
    display: "flex",
  },
  errdiv: {
    display: "flex",
    flexDirection: "column",
  },
  err: {
    color: "red",
    marginTop: "8px",
  },
  btn: {
    fontSize: "large",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
});

const EditUser = () => {
  const navigate = useNavigate();
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  const [userData, setuserData] = useState(null);
  const params = useParams();

  const BASE_URL = "http://localhost:4000/person";

  const fetchCreatedUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${params.userId}`, {
        withCredentials: true,
      });
      console.log(res.data.person);
      if (res.data.person) {
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

  const editUser = async (data) => {
    try {
      const postData = new FormData();
      postData.append("name", data.name);
      postData.append("email", data.email);
      postData.append("mobileNo", data.mobileNo);
      postData.append("profilePic", data.profilePic);
      postData.append("jobType", data.jobType);
      postData.append("dob", data.dob);
      postData.append("prefferedLocationChennai", prefferedLocation);

      const response = await axios.put(
        `${BASE_URL}/${params.userId}`,
        postData,
        {
          withCredentials: true,
        }
      );

      if (response.data.code === "00") {
        setOpen(true);
        console.log("Form Data");
      } else {
        formik.setErrors({
          unknown: response?.data?.message,
        });
      }
    } catch (err) {
      if (err.response?.data?.error?.body?.details) {
        const errors = {};

        err.response?.data?.error?.body?.details?.forEach((e) => {
          errors[e.context.key] = e.message;
        });
        formik.setErrors(errors);
      } else if (err.response?.data?.message) {
        formik.setErrors({
          unknown: err.response?.data.message,
        });
      } else {
        formik.setErrors({
          unknown: err?.message || "An error occured",
        });
      }
    }
  };

  const UserSchema = Yup.object().shape({
    name: Yup.string().required("Please enter name"),
    dob: Yup.string().required("Please enter dob"),
    mobileNo: Yup.string().required("Please enter phone No."),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Please enter email"),
    profilePic: Yup.mixed().required("Profile Pic is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: userData?.name,
      email: userData?.email,
      mobileNo: userData?.mobileNo,
      jobType: userData?.jobType,
      dob: userData?.dob,
      profilePic: null,
    },
    onSubmit: editUser,
    validationSchema: UserSchema,
    enableReinitialize: true,
  });

  console.log(userData?.jobType);

  const [dob, setDob] = useState(userData?.dob);
  const [prefferedLocation, setprefferedLocation] = useState(
    userData?.prefferedLocationChennai
  );

  const onClickCheckbox = () => {
    setprefferedLocation((prev) => !prev);
  };

  const btnnn = {
    fontSize: "large",
    display: "flex",
    justifyContent: "flex-start",
    color: "black",
    marginBottom: "20px",
  };

  console.log(formik.errors);

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

  // const prevImage = `"http://localhost:4000/${userData?.profilePic}"`;

  const classes = useStyles();
  const goBack = () => navigate(-1);
  const [previewImage, setPreviewImage] = useState(formik.values.profilePic);

  useEffect(() => {
    if (userData?.profilePic !== null) {
      setPreviewImage(`"http://localhost:4000/${userData?.profilePic}"`);
    } else {
      setPreviewImage("/static/mock-images/avatars/avatar_default.jpg");
    }
    userData?.prefferedLocationChennai === true
      ? setprefferedLocation(true)
      : setprefferedLocation(false);
  }, [userData?.profilePic, userData?.prefferedLocationChennai]);

  console.log(previewImage);

  return (
    <div>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Data Updated</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
      <Container style={{ marginTop: "25px" }}>
        <Grid container spacing={0}>
          <Grid item xs={3} md={4}>
            <Button size="large" style={btnnn}>
              <ArrowBackIcon style={back} onClick={goBack} />
            </Button>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography
              variant="h4"
              style={{
                display: "flex",
                justifyContent: "center",
                textTransform: "bold",
                marginTop: "10px",
              }}
            >
              Edit User Details
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            md={4}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          ></Grid>
        </Grid>
        {userData ? (
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              <Grid container spacing={1} style={{ marginBottom: "20px" }}>
                <Grid item md={12} xs={12}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Box
                      sx={{
                        width: "150px",
                        height: "150px",
                        marginBottom: "8px",
                      }}
                    >
                      <Tooltip
                        sx={{
                          backgroundColor: "white",
                        }}
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        placement="right-start"
                        title={<EditIcon />}
                      >
                        <IconButton
                          variant="contained"
                          component="label"
                          fullwidth="true"
                        >
                          <Avatar
                            src={previewImage}
                            alt="photoURL"
                            sx={{
                              width: "150px",
                              height: "150px",
                            }}
                          />

                          <input
                            type="file"
                            accept="image/png, image/jpeg, application/pdf"
                            name={"profilePic"}
                            hidden
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              setPreviewImage(
                                URL.createObjectURL(e.target.files[0])
                              );
                              formik.setFieldValue("profilePic", files[0]);
                            }}
                          ></input>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6} className={classes.errdiv}>
                  <TextField
                    error={
                      formik.touched.name && formik.errors.name ? true : false
                    }
                    helperText={
                      formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : ""
                    }
                    className={classes.inputs}
                    variant="outlined"
                    type="text"
                    name="name"
                    label="Name"
                    id="name"
                    defaultValue={userData.name}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={classes.errdiv}>
                  <TextField
                    error={
                      formik.touched.email && formik.errors.email ? true : false
                    }
                    helperText={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : ""
                    }
                    className={classes.inputs}
                    disabled
                    variant="outlined"
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={userData.email}
                    label="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                  />
                </Grid>

                <Grid item xs={12} md={6} className={classes.errdiv}>
                  <TextField
                    error={
                      formik.touched.mobileNo && formik.errors.mobileNo
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.mobileNo && formik.errors.mobileNo
                        ? formik.errors.mobileNo
                        : ""
                    }
                    className={classes.inputs}
                    variant="outlined"
                    type="text"
                    name="mobileNo"
                    id="mobileNo"
                    label="mobileNo"
                    onChange={formik.handleChange}
                    value={formik.values.mobileNo}
                    onBlur={formik.handleBlur}
                  />
                </Grid>

                <Grid item xs={12} md={6} className={classes.errdiv}>
                  <FormControl fullwidth className={classes.inputs}>
                    <InputLabel style={{ margin: 0, padding: 0 }} id="jobType">
                      Job Type
                    </InputLabel>
                    <Select
                      variant="outlined"
                      labelId="jobType"
                      id="jobType"
                      name="jobType"
                      label="jobType"
                      defaultValue={userData?.jobType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <MenuItem value={"ft"}>Full Time</MenuItem>
                      <MenuItem value={"pt"}>Part Time</MenuItem>
                      <MenuItem value={"consultant"}>Consultant</MenuItem>
                    </Select>
                  </FormControl>

                  {formik.touched.jobType && formik.errors.jobType ? (
                    <span className={classes.err}>{formik.errors.jobType}</span>
                  ) : null}
                </Grid>

                <Grid item xs={3} className={classes.errdiv}>
                  <Typography
                    variant="h6"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      textTransform: "bold",
                      marginTop: "10px",
                    }}
                  >
                    Preferred Location :
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  className={classes.errdiv}
                  style={{ marginTop: "0px" }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={
                        //   userData?.prefferedLocationChennai === true
                        //     ? true
                        //     : false
                        // }
                        checked={prefferedLocation}
                        onClick={onClickCheckbox}
                      />
                    }
                    label="Chennai"
                  />
                </Grid>

                <Grid item xs={6} className={classes.errdiv}>
                  <LocalizationProvider size="lg" dateAdapter={AdapterDateFns}>
                    <DatePicker
                      fullWidth
                      value={dob}
                      onChange={(e) => setDob(e)}
                      inputFormat="dd/MM/yyyy"
                      label="Date of Birth"
                      name="dob"
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>

                {formik.errors.unknown && (
                  <span className={classes.err}>{formik.errors.unknown}</span>
                )}
              </Grid>

              <Button
                fullWidth
                style={{ marginTop: "10px" }}
                className={classes.btn}
                type="submit"
                startIcon={
                  formik.isSubmitting ? <CircularProgress size={16} /> : null
                }
                variant="outlined"
              >
                Update
              </Button>
            </Form>
          </FormikProvider>
        ) : (
          <CircularProgress />
        )}
      </Container>
    </div>
  );
};

export default EditUser;
