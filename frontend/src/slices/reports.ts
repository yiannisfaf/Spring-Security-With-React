import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Port {
  portId: number;
  name: string;
  region: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Report {
  reportId: number;
  refs: string;
  prfHmeResidue: boolean;
  prfHmeWashing: boolean;
  cargo: string;
  berth: string;
  reportedProblems: string;
  createdAt: Date;
  updatedAt: Date;
  port: Port;
}

interface IntitialState {
  reports: Report[];
  error: string;
}

const initialState: IntitialState = {
  reports: [],
  error: '',
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState: initialState,
  reducers: {
    loadReports: (state, { payload }: PayloadAction<IntitialState>) => {
      state.reports = payload.reports;
    },
  },
});

export const reportReducer = reportsSlice.reducer;
export const { loadReports } = reportsSlice.actions;
