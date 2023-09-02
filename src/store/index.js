import { configureStore } from "@reduxjs/toolkit";

import { alertReducer } from "./alert.slice";
import { authReducer } from "./auth.slice";
import { usersReducer } from "./users.slice";
import { informationsReducers } from "./informations.slice";
import { transactionReducers } from "./transactions.slice";

export * from "./alert.slice";
export * from "./auth.slice";
export * from "./users.slice";
export * from "./informations.slice";
export * from "./transactions.slice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    users: usersReducer,
    informations: informationsReducers,
    transactions: transactionReducers,
  },
});
