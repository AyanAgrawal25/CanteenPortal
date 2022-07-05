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

  const resetInputs = () => {
    setItem(localStorage.getItem("item"));
    setPrice(localStorage.getItem("price"));
    setRating(localStorage.getItem("rating"));
    setShop(localStorage.getItem("shop"));
    setVnv(localStorage.getItem("vnv"));
    setAddon(localStorage.getItem("addon"));
    setTags(localStorage.getItem("tags"));
  };

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
      .get("http://localhost:4000/food")
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
            <Button color="inherit" onClick={() => navigate("/profile")}>
              My Profile
            </Button>
            <Button color="inherit" onClick={() => navigate("/addfood")}>
              Add Food Item
            </Button>
            <Button color="inherit" onClick={() => navigate("/foodorders")}>
              Food Orders
            </Button>
            <Button color="inherit" onClick={() => navigate("/stats")}>
              Statistics
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
                <TableCell>Item name</TableCell>
                <TableCell>Price</TableCell>
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
                  {localStorage.getItem("stall") === user.shop && (
                    <>
                      <TableRow key={ind}>
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
                              axios
                                .post(
                                  "http://localhost:4000/food/removefood",
                                  user
                                )
                                .then((response) => {
                                  alert("Item Deleted!");
                                  window.location = "/foodpage";
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            onClick={() => {
                              localStorage.setItem("_id", user._id);
                              localStorage.setItem("item", user.item);
                              localStorage.setItem("price", user.price);
                              localStorage.setItem("shop", user.shop);
                              localStorage.setItem("addon", user.addon.join(","));
                              localStorage.setItem("vnv", user.vnv);
                              console.log(user);
                              setUpdate(true);
                              console.log(update);
                            }}
                          >
                            Edit
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
              label="Item Name"
              variant="outlined"
              defaultValue={localStorage.getItem("item")}
              onChange={onChangeItem}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              variant="outlined"
              defaultValue={localStorage.getItem("price")}
              onChange={onChangePrice}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl style={{ minWidth: 235 }}>
              <InputLabel>Veg/Non-veg</InputLabel>
              <Select
                variant="filled"
                defaultValue={localStorage.getItem("vnv")}
                label="Veg or Non-veg"
                onChange={onChangeVnv}
              >
                <MenuItem value="Veg">Veg</MenuItem>
                <MenuItem value="Non-Veg">Non-Veg</MenuItem>
              </Select>
            </FormControl>
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
                {name.map((name) => (
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
                {tag.map((name) => (
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
              Update Item
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default UsersList;
