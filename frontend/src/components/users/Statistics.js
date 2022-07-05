import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
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
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { addMonths } from "date-fns/esm";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const food_height = 48;
const food_padding_top = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: food_height * 4.5 + food_padding_top,
      width: 235,
    },
  },
};

const tag = [
  "Spicy ",
  "Hot ",
  "Cold ",
  "No sugar ",
  "Sugar ",
  "Sour ",
  "Creamy ",
];

const name = [
  "Cheese :10 ",
  "Mayo :10 ",
  "Mushrooms :30 ",
  "Paneer :25 ",
  "Sauce :15 ",
  "Cream :20 ",
  "Milkmaid :15 ",
  "Butter :10 ",
  "Schezwan :15 ",
  "Chicken :25 ",
  "Egg :15 ",
  "Onions :10 ",
  "Strawberries :25 ",
  "Chocolate Sauce :20 ",
  "Nutella :25 ",
];

const UsersList = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [users1, setUsers1] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");

  // edit food
  const [update, setUpdate] = useState(false);
  const [item, setItem] = useState(localStorage.getItem("item"));
  const [price, setPrice] = useState(localStorage.getItem("price"));
  const [rating, setRating] = useState(localStorage.getItem("rating"));
  const [shop, setShop] = useState(localStorage.getItem("stall"));
  const [vnv, setVnv] = useState(localStorage.getItem("vnv"));
  const [addon, setAddon] = useState(localStorage.getItem("addon").split(","));
  const [tags, setTags] = useState(localStorage.getItem("tags").split(","));

  const onChangeItem = (event) => {
    setItem(event.target.value);
  };

  const onChangeUpdate = (event) => {
    setUpdate(event.target.value);
  };

  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const onChangeRating = (event) => {
    setRating(event.target.value);
  };

  const onChangeShop = (event) => {
    setShop(event.target.value);
  };

  const onChangeVnv = (event) => {
    setVnv(event.target.value);
  };

  const onChangeAddon = (event) => {
    const {
      target: { value },
    } = event;
    setAddon(typeof value === "string" ? value.split(",") : value);
  };

  const onChangeTags = (event) => {
    const {
      target: { value },
    } = event;
    setTags(typeof value === "string" ? value.split(",") : value);
  };
  let order_p = 0;
  let order_pd = 0;
  let order_c = 0;

  const resetInputs = () => {
    setItem(localStorage.getItem("item"));
    setPrice(localStorage.getItem("price"));
    setRating(localStorage.getItem("rating"));
    setShop(localStorage.getItem("shop"));
    setVnv(localStorage.getItem("vnv"));
    setAddon(localStorage.getItem("addon"));
    setTags(localStorage.getItem("tags"));
  };
  let freq = new Map();

  const onSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      item: item,
      _id: localStorage.getItem("_id"),
      price: price,
      rating: rating,
      shop: localStorage.getItem("shop"),
      vnv: vnv,
      addon: addon,
      tags: tags,
    };
    console.log(newItem);
    axios
      .post("http://localhost:4000/food/editfood", newItem)
      .then((response) => {
        alert("Item : " + response.data.item + " details updated!");
        console.log(response.data);
        localStorage.setItem("id", response.data._id);
        localStorage.setItem("item", response.data.item);
        localStorage.setItem("price", response.data.price);
        localStorage.setItem("shop", response.data.shop);
        localStorage.setItem("addon", response.data.addon.join(","));
        localStorage.setItem("vnv", response.data.vnv);
        localStorage.setItem("rating", response.data.rating);
        localStorage.setItem("tags", response.data.tags.join(","));
        window.location = "/foodpage";
      })
      .catch((err) => console.log(err));

    resetInputs();
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/buy")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
        users.forEach((user) => {
          if (user.status == "Placed") order_p++;
          if (user.status == "Accepted" || user.status == "Cooking") order_pd++;
          if (user.status == "Completed") order_c++;
        });
        // setSortedUsers(response.data);
        // setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:4000/user")
      .then((response) => {
        setUsers1(response.data);
        console.log(response.data);
        // setSortedUsers(response.data);
        // setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortChange = () => {
    let usersTemp = users;
    const flag = sortName;
    usersTemp.sort((a, b) => {
      if (a.date != undefined && b.date != undefined) {
        return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
      } else {
        return 1;
      }
    });
    setUsers(usersTemp);
    setSortName(!sortName);
  };

  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

  function generateBatchData() {
    const batch = new Map();
    for (let i = 0; i < users.length; i++) {
      if (users[i].status === "Completed") {
        const prevBatchFrq = batch.get(users[i].buyer_batch);
        batch.set(
          users[i].buyer_batch,
          (prevBatchFrq === undefined ? 0 : prevBatchFrq) + 1
        );
      }
    }
    let batchData = Array.from(batch);
    batchData = batchData.map((item) => ({ arg: item[0], val: item[1] }));
    return batchData;
  }

  function generateAgeData() {
    const age = new Map();
    for (let i = 0; i < users.length; i++) {
      if (users[i].status === "Completed") {
        const prevAGe = age.get(users[i].buyer_age);
        age.set(users[i].buyer_age, (prevAGe === undefined ? 0 : prevAGe) + 1);
      }
    }
    let ageData = Array.from(age);
    console.log("Age: ", ageData);
    ageData = ageData.map((item) => ({ arg: item[0], value: item[1] }));
    return ageData;
  }

  return (
    <Grid container style={{ marginTop: "80px" }} align={"center"} spacing={2}>
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
            <Button color="inherit" onClick={() => navigate("/profile")}>
              My Profile
            </Button>
            <Button color="inherit" onClick={() => navigate("/addfood")}>
              Add Food Item
            </Button>
            <Button color="inherit" onClick={() => navigate("/foodpage")}>
              Food Page
            </Button>
            <Button color="inherit" onClick={() => navigate("/foodorders")}>
              Food Orders
            </Button>
            <Button color="inherit" onClick={() => navigate("/")}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid item xs={12} md={12} lg={12}>
        <Paper>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Order Placed</TableCell>
                <TableCell>Order Pending</TableCell>
                <TableCell>Order Completed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {" "}
              {users.forEach((user) => {
                if (user.shop == localStorage.getItem("stall")) {
                  console.log(user.status);
                  if (
                    user.status == "Placed" ||
                    user.status == "Accepted" ||
                    user.status == "Cooking" ||
                    user.status == "Ready to pickup" ||
                    user.status == "Completed"
                  )
                    order_p++;
                  if (
                    user.status == "Accepted" ||
                    user.status == "Cooking" ||
                    user.status == "Ready to pickup"
                  )
                    order_pd++;
                  if (user.status == "Completed") {
                    order_c++;
                  }
                }
              })}
            </TableBody>
            <TableRow>
              <TableCell>{order_p}</TableCell>
              <TableCell>{order_pd}</TableCell>
              <TableCell>{order_c}</TableCell>
            </TableRow>
          </Table>
        </Paper>
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Grid item xs={12} md={9} lg={9}>
          <div>
            <h2>Top 5 items sold</h2>
          </div>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell>No. of times sold</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.forEach((user) => {
                  if (user.shop == localStorage.getItem("stall")) {
                    const obj = freq.get(user.item);
                    if (user.item != "")
                      freq.set(user.item, (obj === undefined ? 0 : obj) + 1);
                  }
                })}
                {Array.from(freq.entries(), ([k, v]) => [k, v])
                  .sort((a, b) => b[1] - a[1])
                  .filter((val, i) => {
                    if (i < 5) return val;
                  })
                  .map((ele) => (
                    <TableRow>
                      <TableCell>{ele[0]}</TableCell>
                      <TableCell>{ele[1]}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <p align="center">Age Vs Orders COMPLETED</p>
        <Chart
          style={{ height: "100px", width: "500px", alignContent: "center" }}
          data={generateAgeData()}
        >
          <ArgumentAxis></ArgumentAxis>
          <ValueAxis>
            scale name="discrete" discreteTicks discreteTickCount={5}
            discreteTickStep={10}
          </ValueAxis>
          <BarSeries valueField="val" argumentField="arg" />
        </Chart>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <p align="center">Batch Vs Orders COMPLETED</p>
        <Chart
          style={{ height: "100px", width: "500px", alignContent: "center" }}
          data={generateBatchData()}
        >
          <ArgumentAxis></ArgumentAxis>
          <ValueAxis>
            scale name="discrete" discreteTicks discreteTickCount={5}
            discreteTickStep={10}
          </ValueAxis>
          <BarSeries valueField="val" argumentField="arg" />
        </Chart>
      </Grid>
    </Grid>
  );
};

export default UsersList;
