/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import Mycontext from "../../context/Mycontext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, where, query, onSnapshot } from "firebase/firestore";
import Loder from "../../components/loder/Loder";

const Login = () => {
  const context = useContext(Mycontext);
  const { loading, setLoading } = context;
  //navigate
  const navigate = useNavigate();

  //user login state
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  //user login function

  const userLoginFunction = async () => {
    //validation
    if (userLogin.email === "" || userLogin.password === "") {
      return toast.error("All fileds are required");
    }
    setLoading(true);

    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );
      console.warn(users);

      try {
        const q = query(
          collection(fireDB, "user"),
          where("uid", "==", users?.user?.uid)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));

          //when email password store then setUserlogin will empty
          setUserLogin({
            email: "",
            password: "",
          });
          toast.success("Login Successfully");
          setLoading(false);

          if (user.role === "user") {
            navigate("/userdashboard");
          } else {
            navigate("/admin");
          }
        });
        return () => data();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginpage bg-blue-50">
      <div className="flex justify-center items-center h-screen">
        {loading && <Loder />}
        {/* Login Form  */}
        <div className="login_Form bg-blue-200 px-1 lg:px-8 py-6 border border-blue-100 rounded-xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-blue-500 ">
              Login
            </h2>
          </div>

          {/* Input Two  */}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email Address"
              value={userLogin.email}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
                  email: e.target.value,
                });
              }}
              className="bg-blue-50 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-200"
            />
          </div>

          {/* Input Three  */}
          <div className="mb-5">
            <input
              type="password"
              value={userLogin.password}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
                  password: e.target.value,
                });
              }}
              placeholder="Password"
              className="bg-blue-50 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-200"
            />
          </div>

          {/* Signup Button  */}
          <div className="mb-5">
            <button
              type="button"
              onClick={userLoginFunction}
              className="bg-blue-500 hover:bg-blue-600 w-full text-white text-center py-2 font-bold rounded-md "
            >
              Login
            </button>
          </div>

          <div>
            <h2 className="text-black">
              Don't Have an account
              <Link className=" text-blue-500 font-bold" to={"/signup"}>
                Signup
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
