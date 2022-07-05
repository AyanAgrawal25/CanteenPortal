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

const Register = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [Type, setType] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");
  const [stall, setStall] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [opening_time, setOT] = React.useState();
  const [closing_time, setCT] = React.useState();
  const [date, setDate] = useState(null);

  const [values, setValues] = useState({
    pwd: "",
    showPassword: false,
  });

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

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeType = (event) => {
    setType(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const onChangeStall = (event) => {
    setStall(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangeOT = (newValue) => {
    setOT(newValue);
    console.log(newValue);
  };

  const onChangeCT = (newValue) => {
    setCT(newValue);
    console.log(newValue);
  };

  const resetInputs = () => {
    setName("");
    setType("");
    setAge("");
    setEmail("");
    setStall("");
    setContact("");
    setOT("");
    setCT("");
    setValues({pwd: '', showPassword: false});
    setBatch("");
    setDate(null);
  };

  const onSubmitBuyer = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      Type: Type,
      email: email,
      contact: contact,
      age: age,
      batch: batch,
      date: (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.now())),
      pwd: values.pwd,
    };
    console.log(newUser);
    axios
      .post("http://localhost:4000/user/register", newUser)
      .then((response) => {
        alert("Created Buyer : " + response.data.name);
        console.log(response.data);
      })
      .catch((err) => console.log(err));

    resetInputs();
  };

  const onSubmitVendor = (event) => {
    event.preventDefault();

    var hrs = new Date(opening_time).getHours();
    var min = new Date(opening_time).getMinutes();

    if(min < 10){
      min = "0" + min;
    }

    if(min1 < 10){
      min1 = "0" + min1;
    }

    var hrs1 = new Date(closing_time).getHours();
    var min1 = new Date(closing_time).getMinutes();

    const newUser = {
      name: name,
      Type: Type,
      email: email,
      contact: contact,
      stall: stall,
      opening_time : hrs + ":" + min,
      closing_time : hrs1 + ":" + min1,
      date: (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.now())),
      pwd: values.pwd,
    };
    console.log(newUser);
    axios
      .post("http://localhost:4000/user/register", newUser)
      .then((response) => {
        alert("Created Vendor : " + response.data.name);
        console.log(response.data);
      })
      .catch((err) => console.log(err));

    resetInputs();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container style={{marginTop:"80px"}} align={"center"} spacing={2}>
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
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button> 
        </Toolbar>
      </AppBar>
    </Box>
        <Grid item xs={12}>
          <FormControl style={{ minWidth: 239 }}>
            <InputLabel>Type</InputLabel>
            <Select
              variant="standard"
              value={Type}
              label="Type"
              onChange={onChangeType}
            >
              <MenuItem value="Vendor">Vendor</MenuItem>
              <MenuItem value="Buyer">Buyer</MenuItem>
            </Select>
          </FormControl>
        <div><br /></div>
        </Grid>
        {Type === "Vendor" && (
          <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Vendor Name"
                variant="outlined"
                value={name}
                onChange={onChangeUsername}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Shop Name"
                variant="outlined"
                value={stall}
                onChange={onChangeStall}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={onChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contact number"
                variant="outlined"
                value={contact}
                onChange={onChangeContact}
              />
            </Grid>
            <Grid item xs={12}>
              <TimePicker
                label="Opening Time"
                value={opening_time}
                ampm={false}
                onChange={onChangeOT}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12}>
              <TimePicker
                label="Closing Time"
                value={closing_time}
                ampm={false}
                onChange={onChangeCT}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
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
          </Grid>
        )}
        {Type === "Buyer" && (
          <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Buyer Name"
                variant="outlined"
                value={name}
                onChange={onChangeUsername}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={onChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contact number"
                variant="outlined"
                value={contact}
                onChange={onChangeContact}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Age"
                variant="outlined"
                value={age}
                onChange={onChangeAge}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Batch name"
                variant="outlined"
                value={batch}
                onChange={onChangeBatch}
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
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
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={Type === "Buyer" ? onSubmitBuyer : onSubmitVendor}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default Register;
