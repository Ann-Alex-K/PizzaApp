import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import { PREFIX } from '../helpers/API';
import { LoginResponse } from '../interfaces/auth.interface';
import axios, { AxiosError } from 'axios';
import { Profile } from '../interfaces/user.interface';
import { RootState } from './store';

export const JWT_PERSISTENCE_KEY = 'userData';

export interface UserpersistenState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginErrMsg?: string;
  profile?: Profile;
  registerErrMsg?: string;
}

//начальное состояние
const initialState: UserState = {
  jwt: loadState<UserpersistenState>(JWT_PERSISTENCE_KEY)?.jwt ?? null,
  loginErrMsg: undefined,
  registerErrMsg: undefined,
};

export const login = createAsyncThunk(
  'user/login',
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password,
      });
      return data;
    } catch (err) {
      if (err instanceof AxiosError)
        throw new Error(err?.response?.data.message ?? 'Unknown error');
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (params: { email: string; password: string; name: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        `${PREFIX}/auth/register`,
        {
          email: params.email,
          password: params.password,
          name: params.name,
        }
      );
      return data;
    } catch (err) {
      if (err instanceof AxiosError)
        throw new Error(err?.response?.data.message ?? 'Unknown error');
    }
  }
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
  'user/getProfile',
  async (_, thunkApi) => {
    const jwt = thunkApi.getState().user.jwt;
    const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.jwt = null;
    },
    clearLoginErr: state => {
      state.loginErrMsg = undefined;
    },
    clearRegisterErr: state => {
      state.loginErrMsg = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.jwt = action.payload.access_token;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loginErrMsg = action.error.message;
    });

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.jwt = action.payload.access_token;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.registerErrMsg = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
