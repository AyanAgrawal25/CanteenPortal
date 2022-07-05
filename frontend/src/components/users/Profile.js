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
import eachMonthOfInterval from "date-fns/eachMonthOfInterval";

const Profile = (props) => {
  const navigate = useNavigate();

  const [name, setName] = useState(localStorage.getItem("name"));
  const [Type, setType] = useState(localStorage.getItem("Type"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [age, setAge] = useState(localStorage.getItem("age"));
  const [batch, setBatch] = useState(localStorage.getItem("batch"));
  const [stall, setStall] = useState(localStorage.getItem("stall"));
  const [contact, setContact] = useState(localStorage.getItem("contact"));
  const [date, setDate] = useState(localStorage.getItem("date"));
  const [addMon, setaddMon] = useState("0");

  const [opening_time, setOT] = React.useState(
    localStorage.getItem("opening_time")
  );
  const [closing_time, setCT] = React.useState(
    localStorage.getItem("closing_time")
  );

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

  const onAddMoney = (event) => {
    setaddMon(event.target.value);
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

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangeDate = (event) => {
    setDate(event.target.value);
  };

  const onChangeOT = (newValue) => {
    setOT(newValue);
  };

  const onChangeCT = (newValue) => {
    setCT(newValue);
  };

  const resetInputs = () => {
    setName(localStorage.getItem("name"));
    setType(localStorage.getItem("Type"));
    setAge(localStorage.getItem("age"));
    setStall(localStorage.getItem("stall"));
    setContact(localStorage.getItem("contact"));
    setDate(localStorage.getItem("date"));
    setOT(localStorage.getItem("opening_time"));
    setCT(localStorage.getItem("closing_time"));
    setValues({ pwd: "", showPassword: false });
    setBatch(localStorage.getItem("batch"));
  };

  const onUpdateBuyer = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      Type: Type,
      email: email,
      contact: contact,
      stall: stall,
      age: age,
      batch: batch,
      opening_time: opening_time,
      date: date,
      closing_time: closing_time,
      pwd: values.pwd,
    };
    console.log(newUser);
    axios
      .post("http://localhost:4000/user/profileEdit", newUser)
      .then((response) => {
        alert("Updated details for Buyer : " + response.data.name);
        console.log(response.data);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("Type", response.data.Type);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("contact", response.data.contact);
        localStorage.setItem("stall", response.data.stall);
        localStorage.setItem("opening_time", response.data.opening_time);
        localStorage.setItem("closing_time", response.data.closing_time);
        localStorage.setItem("date", response.data.date);
        localStorage.setItem("pwd", response.data.pwd);
        localStorage.setItem("age", response.data.age);
        localStorage.setItem("batch", response.data.batch);
        window.location = "/profile";
      })
      .catch((err) => console.log(err));

    resetInputs();
  };

  const onUpdateVendor = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      Type: Type,
      email: email,
      contact: contact,
      stall: stall,
      age: age,
      batch: batch,
      opening_time: opening_time,
      date: date,
      closing_time: closing_time,
      pwd: values.pwd,
    };
    console.log(newUser);
    axios
      .post("http://localhost:4000/user/profileEdit", newUser)
      .then((response) => {
        alert("Updated details for Vendor : " + response.data.name);
        console.log(response.data);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("Type", response.data.Type);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("contact", response.data.contact);
        localStorage.setItem("stall", response.data.stall);
        localStorage.setItem("opening_time", response.data.opening_time);
        localStorage.setItem("closing_time", response.data.closing_time);
        localStorage.setItem("date", response.data.date);
        localStorage.setItem("pwd", response.data.pwd);
        localStorage.setItem("age", response.data.age);
        localStorage.setItem("batch", response.data.batch);
        window.location = "/profile";
      })
      .catch((err) => console.log(err));

    resetInputs();
  };

  const updWallet = (event) => {
    // event.preventDefault();

    const newItem = {
      email: localStorage.getItem("email"),
      amt: addMon,
    };
    console.log(newItem);
    axios
      .post("http://localhost:4000/user/updwallet", newItem)
      .then((response) => {
        console.log(response.data);
        alert("Rs. " + addMon + " added to your wallet!");
        localStorage.setItem("wallet", response.data.wallet);
        window.location = "/profile";
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
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
            {localStorage.getItem("Type") === "Vendor" && (
              <Button color="inherit" onClick={() => navigate("/addfood")}>
                Add Food Item
              </Button>
            )}
            {localStorage.getItem("Type") === "Vendor" && (
              <Button color="inherit" onClick={() => navigate("/foodpage")}>
                Food Items
              </Button>
            )}
            {localStorage.getItem("Type") === "Vendor" && (
              <Button color="inherit" onClick={() => navigate("/foodorders")}>
                Food Orders
              </Button>
            )}
            {localStorage.getItem("Type") === "Buyer" && (
              <TextField
                id="filled-read-only-input"
                label="Current wallet balance"
                defaultValue={localStorage.getItem("wallet")}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
            )}
            {localStorage.getItem("Type") === "Buyer" && (
              <Button color="inherit" onClick={() => navigate("/foodmenu")}>
                Order Food
              </Button>
            )}
            {localStorage.getItem("Type") === "Buyer" && (
              <Button color="inherit" onClick={() => navigate("/buyerorders")}>
                My Orders
              </Button>
            )}
            {localStorage.getItem("Type") === "Vendor" && (
              <Button color="inherit" onClick={() => navigate("/stats")}>
                Statistics
              </Button>
            )}
            <Button color="inherit" onClick={() => navigate("/")}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {localStorage.getItem("Type") === "Vendor" && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid
            container
            style={{ marginTop: "80px" }}
            align={"center"}
            spacing={2}
          >
            <Grid item xs={6}>
              <TextField
                id="filled-read-only-input"
                label="Name"
                defaultValue={localStorage.getItem("name")}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
              <div>
                <br />
              </div>
              <TextField
                id="filled-read-only-input"
                label="Email"
                defaultValue={localStorage.getItem("email")}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
              <div>
                <br />
              </div>
              <TextField
                id="filled-read-only-input"
                label="Contact"
                defaultValue={localStorage.getItem("contact")}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
              <div>
                <br />
              </div>
              <TextField
                id="filled-read-only-input"
                label="Stall"
                defaultValue={localStorage.getItem("stall")}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
              <div>
                <br />
              </div>
              <TextField
                id="filled-read-only-input"
                label="Opening Time"
                defaultValue={localStorage.getItem("opening_time")}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
              <div>
                <br />
              </div>

              <TextField
                id="filled-read-only-input"
                label="Closing Time"
                defaultValue={localStorage.getItem("closing_time")}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
              <div>
                <br />
              </div>
              <TextField
                id="filled-read-only-input"
                label="User since"
                defaultValue={localStorage.getItem("date")}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Vendor Name"
                variant="outlined"
                defaultValue={localStorage.getItem("name")}
                onChange={onChangeUsername}
              />
              <div>
                {" "}
                <br />
              </div>

              <TextField
                label="Shop Name"
                variant="outlined"
                defaultValue={localStorage.getItem("stall")}
                onChange={onChangeStall}
              />
              <div>
                {" "}
                <br />
              </div>

              <TextField
                label="Contact number"
                variant="outlined"
                defaultValue={localStorage.getItem("contact")}
                onChange={onChangeContact}
              />
              <div>
                {" "}
                <br />
              </div>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Change Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.pwd}
                  onChange={handleChange("pwd")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <div>
                {" "}
                <br />
              </div>

              <Button variant="contained" onClick={onUpdateVendor}>
                Update
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      )}
      {localStorage.getItem("Type") === "Buyer" && (
        <Grid
          container
          style={{ marginTop: "80px" }}
          align={"center"}
          spacing={2}
        >
          <Grid item xs={6}>
            <TextField
              id="filled-read-only-input"
              label="Name"
              defaultValue={localStorage.getItem("name")}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
            <div>
              <br />
            </div>
            <TextField
              id="filled-read-only-input"
              label="Email"
              defaultValue={localStorage.getItem("email")}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
            <div>
              <br />
            </div>
            <TextField
              id="filled-read-only-input"
              label="Contact"
              defaultValue={localStorage.getItem("contact")}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
            <div>
              <br />
            </div>
            <TextField
              id="filled-read-only-input"
              label="Age"
              defaultValue={localStorage.getItem("age")}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
            <div>
              <br />
            </div>
            <TextField
              id="filled-read-only-input"
              label="Batch"
              defaultValue={localStorage.getItem("batch")}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
            <div>
              <br />
            </div>
            <TextField
              id="filled-read-only-input"
              label="User since"
              defaultValue={localStorage.getItem("date")}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Buyer Name"
              variant="outlined"
              defaultValue={localStorage.getItem("name")}
              onChange={onChangeUsername}
            />
            <div>
              {" "}
              <br />
            </div>
            <TextField
              label="Contact number"
              variant="outlined"
              defaultValue={localStorage.getItem("contact")}
              onChange={onChangeContact}
            />
            <div>
              {" "}
              <br />
            </div>
            <TextField
              label="Age"
              variant="outlined"
              defaultValue={localStorage.getItem("age")}
              onChange={onChangeAge}
            />
            <div>
              {" "}
              <br />
            </div>
            <TextField
              label="Batch"
              variant="outlined"
              defaultValue={localStorage.getItem("batch")}
              onChange={onChangeBatch}
            />
            <div>
              {" "}
              <br />
            </div>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Change Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.pwd}
                onChange={handleChange("pwd")}
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
            <div>
              {" "}
              <br />
            </div>
            <Button variant="contained" onClick={onUpdateBuyer}>
              Update
            </Button>
            <div>
              <br />
            </div>
            <TextField
              label="Add money to wallet"
              variant="outlined"
              value={addMon}
              onChange={onAddMoney}
            />
            <div>
              <br />
            </div>
            <Button variant="contained" onClick={updWallet}>
              Add money
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Profile;
