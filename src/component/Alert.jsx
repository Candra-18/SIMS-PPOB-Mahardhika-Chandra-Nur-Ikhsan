import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { alertActions } from "store";

export { Alert };

function Alert() {
  const dispatch = useDispatch();
  const location = useLocation();
  const alert = useSelector((x) => x.alert.value);

  useEffect(() => {
    // clear alert on location change
    dispatch(alertActions.clear());
  }, [location]);

  if (!alert) return null;

  return (
    <div className="container">

      <div
      className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-blue-red"
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 mr-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div>
      <div className={`alert alert-dismissible ${alert.type}`}>
          {alert.message}
          <button type="button" className="btn-close" onClick={() => dispatch(alertActions.clear())}></button>
        </div>
      </div>
    </div>
    </div>

    


  
  );
}
