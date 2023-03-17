/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { CollectionAliasSchema } from "typesense/lib/Typesense/Aliases";
import { KeySchema } from "typesense/lib/Typesense/Key";
import { OverrideSchema } from "typesense/lib/Typesense/Override";

interface KeyShemaRefresh extends KeySchema {
  value_prefix: string;
}

interface IInitialState {
  apiKeys: KeyShemaRefresh[];
  aliases: CollectionAliasSchema[];
  curations: OverrideSchema[];
}

const initialState: IInitialState = {
  apiKeys: [],
  aliases: [],
  curations: [],
};

const tempStoreFetchedDataSlice = createSlice({
  name: "tempStoreFetchedData",
  initialState,
  reducers: {
    setFetchedAPIKeys(state, action) {
      state.apiKeys = action.payload;
    },
    deleteAFetchedAPIKey(state, action) {
      const { keyId } = action.payload;
      state.apiKeys = state.apiKeys.filter((key) => key.id !== keyId);
    },

    setFetchedAliases(state, action) {
      state.aliases = action.payload;
    },
    deleteAFetchedAlias(state, action) {
      const { aliasName } = action.payload;
      state.aliases = state.aliases.filter((alias) => alias.name !== aliasName);
    },
    addAlias(state, action) {
      const { alias } = action.payload;
      state.aliases.push(alias);
    },
    setFetchedCuration(state, action) {
      state.curations = action.payload;
    },
    deleteAFetchedCuration(state, action) {
      const { curationName } = action.payload;
      state.curations = state.curations.filter(
        (curation) => curation.id !== curationName
      );
    },
  },
});

export default tempStoreFetchedDataSlice.reducer;
export const {
  setFetchedAPIKeys,
  deleteAFetchedAPIKey,
  setFetchedAliases,
  addAlias,
  deleteAFetchedAlias,
  setFetchedCuration,
  deleteAFetchedCuration,
} = tempStoreFetchedDataSlice.actions;
