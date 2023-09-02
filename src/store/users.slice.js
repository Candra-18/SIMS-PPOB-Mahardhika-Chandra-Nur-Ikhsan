import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  item: null,
  profilePicture: null,
  value: 0,
  picture: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // For getById
    builder
      .addCase(getById.pending, (state) => {
        state.item = { loading: true };
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.item = { value: action.payload };
      })
      .addCase(getById.rejected, (state, action) => {
        state.item = { error: action.error };
      })
      // For getBalance
      .addCase(getBalance.pending, (state) => {
        state.value = { loading: true };
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.value = { value: action.payload };
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.value = { error: action.error };
      })
      .addCase(updateProfile.pending, (state) => {
        state.item = { loading: true };
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.item = { value: action.payload };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.item = { error: action.error };
      })
      .addCase(updateImages.pending, (state) => {
        state.picture = { loading: true };
      })
      .addCase(updateImages.fulfilled, (state, action) => {
        state.picture = { value: action.payload };
      })
      .addCase(updateImages.rejected, (state, action) => {
        state.picture = { error: action.error };
      });
  },
});

const baseUrl = `${process.env.REACT_APP_API_URL}`;
const token = `Bearer ${JSON.parse(localStorage.getItem("tokenjwt"))}`;
const headers = {
  Authorization: token,
};

export const getById = createAsyncThunk("users/profile", async () => {
  try {
    const response = await axios.get(`${baseUrl}/profile`, { headers });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getBalance = createAsyncThunk("users/balance", async () => {
  try {
    const response = await axios.get(`${baseUrl}/balance`, { headers });
    return response.data.data.balance;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const updateProfile = createAsyncThunk("users/updateProfile", async (formData) => {
  try {
    const response = await axios.put(`${baseUrl}/profile/update`, formData, { headers });
    return response.status;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const updateImages = createAsyncThunk("users/updateImage", async (formData) => {
  try {
    const imageFormData = new FormData();
    imageFormData.append("file", formData);

    const response = await axios.put(`${baseUrl}/profile/image`, imageFormData, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const userActions = { ...usersSlice.actions, getById, getBalance, updateProfile, updateImages };
export const usersReducer = usersSlice.reducer;
