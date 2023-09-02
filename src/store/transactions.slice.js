import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: {
    topUp: null,
    loading: false,
    payment: null,
    history: null,
  },
};

const informationSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postTopUp.pending, (state) => {
        state.topUp = { loading: true };
      })
      .addCase(postTopUp.fulfilled, (state, action) => {
        state.topUp = { value: action.payload };
      })
      .addCase(postTopUp.rejected, (state, action) => {
        state.topUp = { error: action.error };
      })
      .addCase(payment.pending, (state) => {
        state.payment = { loading: true };
      })
      .addCase(payment.fulfilled, (state, action) => {
        state.payment = { value: action.payload };
      })
      .addCase(payment.rejected, (state, action) => {
        state.payment = { error: action.error };
      })
      .addCase(history.pending, (state) => {
        state.history = { loading: true };
      })
      .addCase(history.fulfilled, (state, action) => {
        state.history = { value: action.payload };
      })
      .addCase(history.rejected, (state, action) => {
        state.history = { error: action.error };
      });
  },
});

const baseUrl = `${process.env.REACT_APP_API_URL}`;
const token = `Bearer ${JSON.parse(localStorage.getItem("tokenjwt"))}`;
const headers = {
  Authorization: token,
};

export const postTopUp = createAsyncThunk("transactions/topUp", async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/topup`, { top_up_amount: data }, { headers });
    return response.status;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const payment = createAsyncThunk("transactions/payment", async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/transaction`, { service_code: data }, { headers });
    return response.status;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const history = createAsyncThunk("transactions/history", async ({ offset, limit }) => {
  console.log(limit, offset);
  try {
    const response = await axios.get(`${baseUrl}/transaction/history?offset=${offset}&limit=${limit}`, { headers });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access. Please log in again.");
    } else {
      console.log("Error:", error);
    }
  }
});

export const transactionActions = { ...informationSlice.actions, postTopUp, payment, history };
export const transactionReducers = informationSlice.reducer;
