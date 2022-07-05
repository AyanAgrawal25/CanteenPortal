import { useState } from "react";
import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [values, setValues] = useState({
    pwd: "",
    showPassword: false,
  });

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const resetInputs = () => {
    setEmail("");
    setValues({ pwd: "", showPassword: false });
  };

  const onLogin = (event) => {
    event.preventDefault();

    const login_details = {
      email: email,
      pwd: values.pwd,
    };
    console.log(login_details);
    axios
      .post("http://localhost:4000/user/login", login_details)
      .then((response) => {
        // localStorage.setItem('user', JSON.stringify(response.data));
        alert("Login success");
        console.log(response.data);
        localStorage.setItem("ID", response.data._id);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem('Type', response.data.Type);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('contact', response.data.contact);
        localStorage.setItem('stall', response.data.stall);
        localStorage.setItem('opening_time', response.data.opening_time);
        localStorage.setItem('closing_time', response.data.closing_time);
        localStorage.setItem('date', response.data.date);
        localStorage.setItem('pwd', response.data.pwd);
        localStorage.setItem('age', response.data.age);
        localStorage.setItem('batch', response.data.batch);
        localStorage.setItem('wallet', response.data.wallet);
        localStorage.setItem('count', response.data.count);
        navigate("/profile")
      })
      .catch((err) => console.log(err));

    resetInputs();
  };

  return (
    <Grid style = {{marginTop: "80px"}} container align={"center"} spacing={2}>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/register")}>
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.pwd}
            onChange={handleChange('pwd')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onLogin}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
