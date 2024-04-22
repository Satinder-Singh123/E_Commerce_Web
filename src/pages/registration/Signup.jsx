import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Mycontext from "../../context/Mycontext";
import toast from "react-hot-toast";
import { collection } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { fireDB, auth } from "../../firebase/FirebaseConfig";
import Loder from "../../components/loder/Loder";
function Signup() {
  const context = useContext(Mycontext);
  const { loading, setLoading } = context;
  //navigate
  const navigate = useNavigate();
  //user signup state
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  //usersignup function
  const usersignupFunction = async () => {
    // validation
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      toast.error("All Fields are required");
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      // create user object
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      // create user Refrence  to store user in firebase
      const userRefrence = collection(fireDB, "user");

      // Add User Detail  to store user object in firebase
      addDoc(userRefrence, user);

      // When user store then name, email, password will empty
      setUserSignup({
        name: "",
        email: "",
        password: "",
      });

      toast.success("Signup Successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="backgroundclass bg-blue-50">
      <div className="flex justify-center items-center h-screen">
        {/* //loder componente */}

        {loading && <Loder />}
        {/* login Form */}
        <div className="login_Form bg-blue-200 px-1 lg:px-8 py-6 border border-blue-100 rounded-xl shadow-md">
          {/* top Heading */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-blue-700">
              Signup
            </h2>
          </div>
          {/* input one */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Full Name"
              value={userSignup.name}
              onChange={(e) => {
                setUserSignup({
                  // create copy ...userSignup and then take name
                  ...userSignup,
                  name: e.target.value,
                });
              }}
              className="bg-blue-50 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-200"
            />
          </div>
          {/* input two */}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email Address"
              value={userSignup.email}
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
                  email: e.target.value,
                });
              }}
              className="bg-blue-50 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-200"
            />
          </div>
          {/* input three */}
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              value={userSignup.password}
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
                  password: e.target.value,
                });
              }}
              className="bg-blue-50 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-200"
            />
          </div>
          {/* signup button */}
          <div className="mb-5">
            <button
              type="button"
              onClick={usersignupFunction}
              className="bg-blue-500 hover:bg-blue-700 w-full text-white text-center py-2 font-bold rounded-md"
            >
              Signup
            </button>
          </div>
          <div>
            <h2 className="text-black">
              Have an account
              <Link className="text-blue-700 font-bold " to={"/login"}>
                {" "}
                Login
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
