import { Navigate } from "react-router";

export const ProtectedRouteForAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("users"));

  //if user role is admin then only show admin pages
  if (user?.role === "admin") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
