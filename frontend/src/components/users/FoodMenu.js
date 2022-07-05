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
import fuzzy from "fuzzy";
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
  const [status, setStatus] = useState("");
  const [cost, setCost] = useState(0);
  const [vnv, setVnv] = useState(localStorage.getItem("vnv"));
  const [quantity, setQuantity] = useState(1);
  const [addon, setAddon] = useState(localStorage.getItem("addon").split(","));
  const [tags, setTags] = useState(localStorage.getItem("tags").split(","));
  const [mn, setmn] = useState("");
  const [mx, setmx] = useState("");
  const onChangemn = (event) => {
    setmn(event.target.value);
  };
  const onChangemx = (event) => {
    setmx(event.target.value);
  };
  const onChangeItem = (event) => {
    setItem(event.target.value);
  };

  const onChangeStatus = (event) => {
    setStatus(event.target.value);
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
    setStatus("");
    setCost(0);
    setQuantity(1);
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
      buyer_age : localStorage.getItem("age"),
      buyer_batch : localStorage.getItem("batch"),
      addon: addon,
      tags: tags,
      buyer_id: localStorage.getItem("ID"),
      cost: cost,
      placed_time: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(Date.now()),
      status: status,
      quantity: quantity,
      buyer: localStorage.getItem("email"),
    };
    if (cost > localStorage.getItem("wallet")) {
      alert("Insufficient balance");
    } else {
      console.log(newItem);
      axios
        .post("http://localhost:4000/buy/foodbuy", newItem)
        .then((response) => {
          console.log(response.data);
          alert(
            "Item : " +
              response.data.item +
              " ordered!\nYour bill is : Rs " +
              response.data.cost
          );
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("item", response.data.item);
          localStorage.setItem("price", response.data.price);
          localStorage.setItem("shop", response.data.shop);
          localStorage.setItem("addon", response.data.addon.join(","));
          localStorage.setItem("vnv", response.data.vnv);
          localStorage.setItem("quantity", response.data.quantity);
          localStorage.setItem("buyer_id", response.data.buyer_id);
          localStorage.setItem("buyer_age", response.data.buyer_age);
          localStorage.setItem("buyer_batch", response.data.buyer_batch);
          localStorage.setItem("cost", response.data.cost);
          localStorage.setItem("status", response.data.status);
          localStorage.setItem("rating", response.data.rating);
          localStorage.setItem("placed_time", response.data.placed_time);
          localStorage.setItem("buyer", response.data.buyer);
          localStorage.setItem("tags", response.data.tags.join(","));
        })
        .catch((err) => console.log(err));

      const user1 = {
        email: localStorage.getItem("email"),
        cost: cost,
      };
      axios
        .post("http://localhost:4000/user/decwallet", user1)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("wallet", response.data.wallet);
          window.location = "/foodmenu";
        })
        .catch((err) => console.log(err));
    }
    resetInputs();
  };
  const sortChange = () => {
    let usersTemp = users;
    const flag = sortName;
    usersTemp.sort((a, b) => {
      if (flag) {
        return Number(a.price) - Number(b.price);
      } else {
        return Number(b.price) - Number(a.price);
      }
    });
    setUsers(usersTemp);
    setSortName(!sortName);
  };

  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/food")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
        setSortedUsers(response.data);
        setSearchText("");
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

  return (
    <Grid container style={{ marginTop: "80px" }} align={"center"} spacing={2}>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={customFunction}
            />
          </List>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={6} lg={6}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Price
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Min"
                    value={mn}
                    fullWidth={true}
                    onChange={onChangemn}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Max"
                    fullWidth={true}
                    value={mx}
                    onChange={onChangemx}
                  />
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem divider>
              <Autocomplete
                id="combo-box-demo"
                options={users}
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Names"
                    variant="outlined"
                  />
                )}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
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
            <Button color="inherit" onClick={() => navigate("/buyerorders")}>
              My Orders
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
                <TableCell>Sr No.</TableCell>
                <TableCell>Item name</TableCell>
                <TableCell>
                  {" "}
                  <Button onClick={sortChange}>
                    {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                  </Button>
                  Price
                </TableCell>
                <TableCell>Shop</TableCell>
                <TableCell>Veg/Non-Veg</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Add-Ons</TableCell>
                <TableCell>Tags</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, ind) => (
                <>
                  {fuzzy.test(searchText, user.item) &&
                    (Number(user.price) >= Number(mn) || mn === "") &&
                    (Number(user.price) <= Number(mx) || mx === "") && (
                      <>
                        <TableRow key={ind}>
                          <TableCell>{++ind}</TableCell>
                          <TableCell>{user.item}</TableCell>
                          <TableCell>{user.price}</TableCell>
                          <TableCell>{user.shop}</TableCell>
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
                          <TableCell>
                            <Button
                              variant="contained"
                              onClick={() => {
                                localStorage.setItem("id", user._id);
                                localStorage.setItem("shop", user.shop);
                                localStorage.setItem("item", user.item);
                                localStorage.setItem("price", user.price);
                                users1.forEach((vendor) => {
                                  if (user.shop === vendor.stall) {
                                    var ot = vendor.opening_time;
                                    var ct = vendor.closing_time;

                                    var dt = new Date();

                                    var startTime = ot + ":00";
                                    var endTime = ct + ":00";
                                    console.log(startTime);
                                    console.log(endTime);
                                    console.log(dt);

                                    var s = startTime.split(":");
                                    var dt1 = new Date(
                                      dt.getFullYear(),
                                      dt.getMonth(),
                                      dt.getDate(),
                                      parseInt(s[0]),
                                      parseInt(s[1]),
                                      parseInt(s[2])
                                    );

                                    var e = endTime.split(":");
                                    var dt2 = new Date(
                                      dt.getFullYear(),
                                      dt.getMonth(),
                                      dt.getDate(),
                                      parseInt(e[0]),
                                      parseInt(e[1]),
                                      parseInt(e[2])
                                    );

                                    var str;

                                    if (dt >= dt1 && dt <= dt2) {
                                      str = 0;
                                    } else {
                                      str = 1;
                                    }

                                    if (str) {
                                      alert("Shop is closed!");
                                    }
                                    else{
                                      localStorage.setItem(
                                        "addon",
                                        user.addon.join(",")
                                      );
                                      localStorage.setItem(
                                        "tags",
                                        user.tags.join(",")
                                      );
                                      setUpdate(true);
                                      setStatus("Placed");
                                    }
                                  }
                                });
                                
                              }}
                            >
                              Buy now
                            </Button>
                          </TableCell>
                        </TableRow>
                      </>
                    )}
                </>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      {update && (
        <Grid
          container
          style={{ marginTop: "30px" }}
          align={"center"}
          spacing={2}
        >
          <Grid item xs={12}>
            <TextField
              id="filled-read-only-input"
              label="Item name"
              defaultValue={localStorage.getItem("item")}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="filled-read-only-input"
              label="Price"
              defaultValue={localStorage.getItem("price")}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="filled-read-only-input"
              label="Veg/Non-Veg"
              defaultValue={localStorage.getItem("vnv")}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              label="Quantity"
              variant="outlined"
              defaultValue={quantity}
              onChange={onChangeQuantity}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">Add-Ons</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                variant="filled"
                value={addon}
                onChange={onChangeAddon}
                input={<OutlinedInput label="Add-ons" />}
                renderValue={(selected) => selected.join(",")}
                MenuProps={MenuProps}
              >
                {localStorage
                  .getItem("addon")
                  .split(",")
                  .map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={addon.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">Tags</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                variant="filled"
                value={tags}
                onChange={onChangeTags}
                input={<OutlinedInput label="Tags" />}
                renderValue={(selected) => selected.join(",")}
                MenuProps={MenuProps}
              >
                {localStorage
                  .getItem("tags")
                  .split(",")
                  .map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={tags.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <div>
            <br />
          </div>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit}>
              Buy now
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default UsersList;
