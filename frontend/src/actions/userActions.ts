import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
export const ACCESS_TOKEN = 'accessToken';

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ usernameOrEmail, password }: LoginRequest, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        API_BASE_URL + '/auth/signin',
        { usernameOrEmail, password },
        config
      )

      // store user's token in local storage
      localStorage.setItem(ACCESS_TOKEN, data.userToken);

      return data;
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ firstName, lastName, username, email, password }: SignUpRequest, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      await axios.post(
        API_BASE_URL + '/auth/signup',
        { firstName, lastName, username, email, password },
        config
      )
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)