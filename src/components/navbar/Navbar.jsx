import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "../searchbar/Searchbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  // const user = JSON.parse(localStorage.getItem("users"));

  // Retrieve the value associated with the key "users" from localStorage
const user = localStorage.getItem("users");

// Check if usersString is not null and is a valid JSON string
if (user !== null) {
    try {
        // Parse the JSON string to an object
        const users = JSON.parse(user);
        
        // Now you can work with the `users` object
        console.log(users);
    } catch (error) {
        // Handle the case when "users" is not valid JSON
        console.error("Error parsing JSON:", error);
    }
} else {
    // Handle the case when "users" is not present in localStorage
    console.log("No users found in localStorage");
}

  // console.log(user)
  const navigate = useNavigate();

  //CartItems
  const cartItmes = useSelector((state) => state.cart);

  const logout = () => {
    //clear localstorage
    localStorage.clear("user");
    navigate("/login");
  };
  // navlist
  const navList = (
    <ul className="flex space-x-3 text-white font-medium text-md px-5">
      {/* Home */}
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      {/* All Products */}
      <li>
        <Link to={"/allproduct"}>All Product</Link>
      </li>
      {/* SignUp */}
      {/* when user is not then empty */}
      {!user ? (
        <li>
          <Link to={"/signup"}>Signup</Link>
        </li>
      ) : (
        ""
      )}
      {/* Login */}
      {!user ? (
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      ) : (
        ""
      )}
      {/* User */}
      {user?.role === "user" && (
        <li>
          <Link to={"/userdashboard"}>{user.name}</Link>
        </li>
      )}
      {/* Admin */}
      {user?.role === "admin" && (
        <li>
          <Link to={"/admin"}>{user?.admin}</Link>
        </li>
      )}
      {/* logout */}
      {user && (
        <li className="cursor-pointer" onClick={logout}>
          <Link to={"/logout"}>Logout</Link>
        </li>
      )}

      {/* cart */}
      <li>
        <Link to={"/cart"}>Cart({cartItmes.length})</Link>
      </li>
    </ul>
  );
  return (
    <nav className="bg-blue-300 sticky top-0">
      {/* main */}
      <div className="lg:flex lg:justify-between itmes-center py-3 lg:px-3">
        {/* left */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className="font-bold text-white text-2xl text-center ">
              Shopping Cart
            </h2>
          </Link>
        </div>

        {/* right */}
        <div className="right flex justify-center mb-4 lg:mb-0">{navList}</div>
        {/* Search Bar */}
        <Searchbar />
      </div>
    </nav>
  );
};
export default Navbar;
