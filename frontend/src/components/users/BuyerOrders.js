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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import React from "react";
import Slider from "@mui/material/Slider";
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

const UsersList = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");

  // edit food
  const [update, setUpdate] = useState(false);
  const [item, setItem] = useState(localStorage.getItem("item"));
  const [price, setPrice] = useState(localStorage.getItem("price"));
  const [rating, setRating] = useState(localStorage.getItem("rating"));
  const [shop, setShop] = useState(localStorage.getItem("stall"));
  const [cost, setCost] = useState(0);
  const [vnv, setVnv] = useState(localStorage.getItem("vnv"));
  const [quantity, setQuantity] = useState(0);
  const [addon, setAddon] = useState(localStorage.getItem("addon").split(","));
  const [tags, setTags] = useState(localStorage.getItem("tags").split(","));

  const onChangeItem = (event) => {
    setItem(event.target.value);
  };

  const onChangeUpdate = (event) => {
    setUpdate(event.target.value);
  };

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);

    const addonPrices = addon.map((item) => {
      return parseInt(item.split(":")[1]);
    });
    setCost(
      parseInt(event.target.value) *
        (addon
          .map((a) => parseInt(a.split(":")[1]))
          .reduce((a, b) => a + b, 0) +
          parseInt(price))
    );
  };

  // const onChangeCost = (event) => {
  //   setCost(event.target.value);
  // };

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
    setCost(
      parseInt(quantity) *
        (value
          .map((a) => parseInt(a.split(":")[1]))
          .reduce((a, b) => a + b, 0) +
          parseInt(price))
    );
  };

  const onChangeTags = (event) => {
    const {
      target: { value },
    } = event;
    setTags(typeof value === "string" ? value.split(",") : value);
  };

  const resetInputs = () => {
    setItem(localStorage.getItem("item"));
    setPrice(localStorage.getItem("price"));
    setRating(localStorage.getItem("rating"));
    setShop(localStorage.getItem("shop"));
    setVnv(localStorage.getItem("vnv"));
    setAddon(localStorage.getItem("addon"));
    setTags(localStorage.getItem("tags"));
    setCost(0);
    setQuantity(0);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      item: localStorage.getItem("item"),
      id: localStorage.getItem("id"),
      price: localStorage.getItem("price"),
      rating: localStorage.getItem("rating"),
      shop: localStorage.getItem("shop"),
      vnv: localStorage.getItem("vnv"),
      addon: addon,
      tags: tags,
      cost: cost,
      quantity: quantity,
    };
    console.log(newItem);
    axios
      .post("http://localhost:4000/buy/foodbuy", newItem)
      .then((response) => {
        alert(
          "Item : " +
            response.data.item +
            " ordered!\nYour bill is : Rs " +
            response.data.cost
        );
        console.log(response.data);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("item", response.data.item);
        localStorage.setItem("price", response.data.price);
        localStorage.setItem("shop", response.data.shop);
        localStorage.setItem("addon", response.data.addon.join(","));
        localStorage.setItem("vnv", response.data.vnv);
        localStorage.setItem("quantity", response.data.quantity);
        localStorage.setItem("cost", response.data.cost);
        localStorage.setItem("rating", response.data.rating);
        localStorage.setItem("tags", response.data.tags.join(","));
        window.location = "/foodmenu";
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
        // setSortedUsers(response.data);
        // setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const pickedup = (event) => {
    // event.preventDefault();

    const newItem = {
      id: localStorage.getItem("id"),
    };
    console.log(newItem);
    axios
      .post("http://localhost:4000/buy/buyerPickupFood", newItem)
      .then((response) => {
        console.log(response.data);
        window.location = "/buyerorders";
      })
      .catch((err) => console.log(err));
  };

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
            <TextField
              id="filled-read-only-input"
              label="Current wallet balance"
              defaultValue={localStorage.getItem("wallet")}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
            <Button color="inherit" onClick={() => navigate("/profile")}>
              My Profile
            </Button>
            <Button color="inherit" onClick={() => navigate("/foodmenu")}>
              Order Food
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
                <TableCell>Sr. No</TableCell>
                <TableCell>Placed Time</TableCell>
                <TableCell>Item name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Veg/Non-Veg</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Add-Ons</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, ind) => (
                <TableRow key={ind}>
                  <TableCell>{ind}</TableCell>
                  <TableCell>{user.placed_time}</TableCell>
                  <TableCell>{user.item}</TableCell>
                  <TableCell>Rs. {user.price}</TableCell>
                  <TableCell>{user.quantity} no.</TableCell>
                  <TableCell>{user.vnv}</TableCell>
                  <TableCell>{user.rating}</TableCell>
                  <TableCell>
                    {user.addon.map((name, ind) => (
                      <div key={ind}>
                        {ind + 1}. {name}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {user.tags.map((name, ind) => (
                      <div key={ind}>
                        {ind + 1}. {name}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>Rs. {user.cost}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    {user.status === "Ready to pickup" && (
                      <Button
                        variant="contained"
                        onClick={() => {
                          localStorage.setItem("id", user._id);
                          pickedup();
                        }}
                      >
                        Picked up
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UsersList;
