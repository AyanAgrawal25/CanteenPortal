import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
// import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import Login from "./components/common/Login";
import AddFood from "./components/users/AddFood";
import FoodPage from "./components/users/FoodPage";
import FoodMenu from "./components/users/FoodMenu";
import FoodOrders from "./components/users/FoodOrders";
import BuyerOrders from "./components/users/BuyerOrders";
import Stats from "./components/users/Statistics";

const Layout = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="addfood" element={<AddFood />} />
          <Route path="profile" element={<Profile />} />
          <Route path="Login" element={<Login />} />
          <Route path="foodpage" element={<FoodPage />} />
          <Route path="foodmenu" element={<FoodMenu />} />
          <Route path="foodorders" element={<FoodOrders />} />
          <Route path="buyerorders" element={<BuyerOrders />} />
          <Route path="stats" element={<Stats />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
