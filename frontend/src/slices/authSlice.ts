import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { registerUser, userLogin } from '../actions/userActions'
import { ACCESS_TOKEN } from '../util/api';

interface AuthState {
    loading: boolean;
    userInfo: Object | null;
    userToken: string | null;
    error: any;
    success: boolean;
}

interface LoginResponse {
    accessToken: string;
    tokenType: string;
}

const userToken = localStorage.getItem(ACCESS_TOKEN)
  ? localStorage.getItem(ACCESS_TOKEN)
  : null;

const initialState: AuthState = {
  loading: false,
  userInfo: {}, // for user object
  userToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state: AuthState) => {
        localStorage.removeItem(ACCESS_TOKEN) // delete token from storage
        state.loading = false
        state.userInfo = null
        state.userToken = null
        state.error = null
      },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(userLogin.pending, (state: AuthState) => {
        state.loading = true
        state.error = null
    }),
    builder.addCase(userLogin.fulfilled, (state: AuthState, { payload }: PayloadAction<LoginResponse>) => {
        state.loading = false
        state.userInfo = payload
        state.userToken = payload.accessToken
    }),
    builder.addCase(userLogin.rejected, (state: AuthState, { payload }: PayloadAction<any>) => {
        state.loading = false
        state.error = payload
    }),
    // register user
    builder.addCase(registerUser.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
    }),
    builder.addCase(registerUser.fulfilled, (state: AuthState, { payload }: PayloadAction) => {
      state.loading = false
      state.success = true // registration successful
    }),
    builder.addCase(registerUser.rejected, (state: AuthState, { payload }: PayloadAction<any>) => {
      state.loading = false
      state.error = payload
    })
  }
})

export const { logout } = userSlice.actions;

export default userSlice.reducer;