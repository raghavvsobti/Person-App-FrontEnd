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
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { DatePicker, LocalizationProvider } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import SuccessModal from "../Components/SuccessModal";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
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

const CreateUser = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const handleClose = () => {
    navigate(-1);
  };
  const [successModal, setSuccessModal] = useState(false);

  const BASE_URL = "http://localhost:4000/person";

  const createUser = async (data) => {
    try {
      const postData = new FormData();
      postData.append("name", data.name);
      postData.append("email", data.email);
      postData.append("mobileNo", data.mobileNo);
      postData.append("profilePic", data.profilePic);
      postData.append("jobType", data.jobType);
      postData.append("dob", data.dob);
      postData.append("prefferedLocationChennai", prefferedLocation);

      const response = await axios.post(`${BASE_URL}`, postData, {
        withCredentials: true,
      });

      if (response.data.code === "00") {
        setSuccessModal(true);
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
      name: "",
      email: "",
      mobileNo: "",
      jobType: "ft",
      dob: new Date(),
    },
    onSubmit: createUser,
    validationSchema: UserSchema,
  });

  const classes = useStyles();

  const [dob, setDob] = useState(undefined);
  const [prefferedLocation, setprefferedLocation] = useState(true);

  const onClickCheckbox = () => {
    setprefferedLocation((prev) => !prev);
  };

  return (
    <div>
      <SuccessModal
        message="New User Created"
        successOpen={successModal}
        closeHandler={handleClose}
      />

      <Container className={classes.wrapper}>
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
              Create New User
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
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
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
                  variant="outlined"
                  type="email"
                  name="email"
                  id="email"
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
                  label="Mobile No."
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
                    value={formik.values.jobType}
                    label="jobType"
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
                style={{ marginTop: "5px" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
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

            <Grid item xs={12} className={classes.errdiv}>
              {formik.values.panCard?.name && (
                <p style={{ marginBottom: 8 }}>{formik.values.panCard?.name}</p>
              )}
              <Button
                variant="contained"
                fullWidth
                component="label"
                style={{ marginTop: 10, marginX: 10 }}
              >
                Upload Profile Pic
                <input
                  type="file"
                  accept="image/png, image/jpeg, application/pdf"
                  name={"profilePic"}
                  hidden
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    formik.setFieldValue("profilePic", files[0]);
                  }}
                />
              </Button>

              {formik.errors.profilePic && (
                <span className={classes.err}>{formik.errors.profilePic}</span>
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
              Submit
            </Button>
          </Form>
        </FormikProvider>
      </Container>
    </div>
  );
};

export default CreateUser;
