/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as Thunks from "./deletionAsyncThunks";

interface IInitialState {
  collectionDeletedSuccessfully: boolean;
  collectionDeleteError: boolean;
  apiKeyDeletedSuccessfully: boolean;
  apiKeyDeleteError: boolean;
}

const initialState: IInitialState = {
  collectionDeletedSuccessfully: false,
  collectionDeleteError: false,
  apiKeyDeletedSuccessfully: false,
  apiKeyDeleteError: false,
};

const deletionsSlice = createSlice({
  name: "deletions",
  initialState,
  reducers: {
    restoreCollectionDeletedOrError(state) {
      state.collectionDeletedSuccessfully = false;
      state.collectionDeleteError = false;
    },
    restoreAPIKeyDeletedOrError(state) {
      state.apiKeyDeletedSuccessfully = false;
      state.apiKeyDeleteError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Thunks.deleteCollection.fulfilled, (state) => {
      state.collectionDeletedSuccessfully = true;
    });
    builder.addCase(Thunks.deleteCollection.rejected, (state) => {
      state.collectionDeleteError = true;
    });
    builder.addCase(Thunks.deleteAPIKey.fulfilled, (state) => {
      state.apiKeyDeletedSuccessfully = true;
    });
    builder.addCase(Thunks.deleteAPIKey.rejected, (state) => {
      state.apiKeyDeleteError = true;
    });
  },
});

export default deletionsSlice.reducer;
export const { restoreCollectionDeletedOrError, restoreAPIKeyDeletedOrError } =
  deletionsSlice.actions;
