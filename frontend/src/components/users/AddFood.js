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
  "Tangy",
  "Falahari",
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
  "Ice :5",
  "Mint :10",
  "Schezwan :15 ",
  "Chicken :25 ",
  "Egg :15 ",
  "Onions :10 ",
  "Strawberries :25 ",
  "Chocolate Sauce :20 ",
  "Nutella :25 ",
];

const FoodItem = (props) => {
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("0");
  const [shop, setShop] = useState(localStorage.getItem("stall"));
  const [vnv, setVnv] = useState("");
  const [addon, setAddon] = useState([]);
  const [tags, setTags] = useState([]);

  const onChangeItem = (event) => {
    setItem(event.target.value);
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
    setItem("");
    setPrice("");
    setRating("0");
    setShop("");
    setVnv("");
    setAddon([]);
    setTags([]);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      item: item,
      price: price,
      rating: rating,
      shop: shop,
      vnv: vnv,
      addon: addon,
      tags: tags,
    };
    console.log(newItem);
    axios
      .post("http://localhost:4000/food/addfood", newItem)
      .then((response) => {
        alert("Item : " + response.data.item + " added!");
        console.log(response.data);
        localStorage.setItem("_id", response.data._id);
        localStorage.setItem("item", response.data.item);
        localStorage.setItem("price", response.data.price);
        localStorage.setItem("shop", response.data.shop);
        localStorage.setItem("addon", response.data.addon.join(","));
        localStorage.setItem("vnv", response.data.vnv);
        localStorage.setItem("rating", response.data.rating);
        localStorage.setItem("tags", response.data.tags.join(","));
      })
      .catch((err) => console.log(err));

    resetInputs();
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
            <Button color="inherit" onClick={() => navigate("/foodpage")}>
              Food Items
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
      <Grid item xs={12}>
        <TextField
          label="Item name"
          variant="outlined"
          value={item}
          onChange={onChangeItem}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Price"
          variant="outlined"
          value={price}
          onChange={onChangePrice}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="filled-read-only-input"
          label="Shop"
          defaultValue={localStorage.getItem("stall")}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl style={{ minWidth: 235 }}>
          <InputLabel>Veg/Non-veg</InputLabel>
          <Select
            variant="filled"
            value={vnv}
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
            renderValue={(selected) => selected.join(", ")}
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
            renderValue={(selected) => selected.join(", ")}
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
          Add Item
        </Button>
      </Grid>
    </Grid>
  );
};

export default FoodItem;
