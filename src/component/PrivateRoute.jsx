import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { history } from "services";

export { PrivateRoute };

function PrivateRoute() {
  const auth = useSelector((x) => x.auth.value.token);

  if (!auth) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" state={{ from: history.location }} />;
  }

  // authorized so return outlet for child routes
  return <Outlet />;
}
