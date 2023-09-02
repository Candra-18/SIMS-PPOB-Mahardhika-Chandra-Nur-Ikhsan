import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: {
    loading: false,
    value: null,
    error: null,
  },
  listService: {
    loading: false,
    value: null,
    error: null,
  },
};

const informationSlice = createSlice({
  name: "informations",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBanner.pending, (state) => {
        state.list.loading = true;
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.list.loading = false;
        state.list.value = action;
      })
      .addCase(getBanner.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.error;
      })
      .addCase(getServices.pending, (state) => {
        state.listService.loading = true;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.listService.loading = false;
        state.listService.value = action;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.listService.loading = false;
        state.listService.error = action.error;
      });
  },
});

const baseUrl = `${process.env.REACT_APP_API_URL}`;
const token = `Bearer ${JSON.parse(localStorage.getItem("tokenjwt"))}`;
const headers = {
  Authorization: token,
};

export const getBanner = createAsyncThunk("information/banner", async () => {
  try {
    const response = await axios.get(`${baseUrl}/banner`, { headers });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getServices = createAsyncThunk("information/services", async () => {
  try {
    const response = await axios.get(`${baseUrl}/services`, { headers });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const informationActions = { ...informationSlice.actions, getBanner, getServices };
export const informationsReducers = informationSlice.reducer;
