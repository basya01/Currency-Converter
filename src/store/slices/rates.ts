import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getDataLS, setDataLS } from '../../utils/localStorageHelper';

export enum Status {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface RatesData {
  table: string;
  rates: Record<string, number>;
  lastupdate: string;
}

interface RatesState {
  data: RatesData;
  status: Status;
  main: string;
}

const initialState: RatesState = {
  data: { table: '', rates: {}, lastupdate: '' },
  status: Status.PENDING,
  main: getDataLS('main').length ? getDataLS('main') : 'USD',
};

export const fetchRates = createAsyncThunk<RatesData>('animes/fetchRates', async () => {
  const { data } = await axios.get<RatesData>('https://cdn.cur.su/api/latest.json');

  return data;
});

export const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    setMain: (state, action: PayloadAction<string>) => {
      state.main = action.payload;
      setDataLS('main', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchRates.pending, (state) => {
        state.status = Status.PENDING;
      })
      .addCase(fetchRates.rejected, (state, action) => {
        state.status = Status.ERROR;
      });
  },
});

export const { setMain } = ratesSlice.actions;

export default ratesSlice.reducer;
