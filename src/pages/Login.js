import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Footer from "../componenet/Footer";
import axios from "axios";
import { useHistory, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
}));

const Login = () => {
  const classes = useStyles();

  // the api end point
  const api = axios.create({
    baseURL: `http://localhost/fish/api2/`,
  });

  const [data, setData] = useState({
    Email: "",
    password: "",
  });
  const [Error, setError] = useState(false);

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  let history = useHistory();

  const Logining = () => {
    api.post(`/index.php?type=login`, data).then((res) => {
      if (res.data) {
        sessionStorage.setItem("loginData", JSON.stringify(res.data));
        history.push("/boats");
      } else {
        sessionStorage.setItem("userData", "");
        sessionStorage.clear();
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
      }
    });
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="email Address"
              name="Email"
              autoComplete="email"
              autoFocus
              onChange={onChange}
              value={data.Email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
              value={data.password}
            />
            {Error && (
              <Typography className="text-danger">
                {" "}
                Email or password is uncorrect{" "}
              </Typography>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={Logining}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default withRouter(Login);
