import { createAsyncThunk } from "@reduxjs/toolkit";
import TypesenseActions, {
  ITypesenseAuthData,
} from "../../../utils/typesenseActions";

interface IdeleteCollection {
  typesenseAuthData: ITypesenseAuthData;
  collectionName: string;
}
export const deleteCollection = createAsyncThunk(
  "typesense/deleteCollection",
  async (deleteColectionData: IdeleteCollection) => {
    const typesenseAPI = new TypesenseActions(
      deleteColectionData.typesenseAuthData
    ); // Handle this more gracefully
    try {
      const response = await typesenseAPI.deleteCollection(
        deleteColectionData.collectionName
      );
      return response;
    } catch (error) {
      throw new Error("Could not delete the collection");
    }
  }
);

interface IDeleteAPIKey {
  typesenseAuthData: ITypesenseAuthData;
  keyId: number;
}
export const deleteAPIKey = createAsyncThunk(
  "typesense/deleteAPIKey",
  async (deleteKey: IDeleteAPIKey) => {
    const typesenseAPI = new TypesenseActions(deleteKey.typesenseAuthData); // Handle this more gracefully
    try {
      const response = await typesenseAPI.deleteAPIKey(deleteKey.keyId);
      return response;
    } catch (error) {
      throw new Error("Could not delete the API key");
    }
  }
);
interface IDeleteAlias {
  typesenseAuthData: ITypesenseAuthData;
  aliasName: string;
}
export const deleteAlias = createAsyncThunk(
  "typesense/deleteAPIKey",
  async (aliasDelete: IDeleteAlias) => {
    const typesenseAPI = new TypesenseActions(aliasDelete.typesenseAuthData); // Handle this more gracefully
    try {
      const response = await typesenseAPI.deleteAlias(aliasDelete.aliasName);
      return response;
    } catch (error) {
      throw new Error("Could not delete the Alias");
    }
  }
);

interface IDeleteCuration {
  typesenseAuthData: ITypesenseAuthData;
  collectionName: string;
  curationName: string;
}
export const deleteCuration = createAsyncThunk(
  "typesense/deleteCuration",
  async (curationDelete: IDeleteCuration) => {
    const typesenseAPI = new TypesenseActions(curationDelete.typesenseAuthData); // Handle this more gracefully
    try {
      const response = await typesenseAPI.deleteCuration(
        curationDelete.collectionName,
        curationDelete.curationName
      );
      return response;
    } catch (error) {
      throw new Error("Could not delete the curation");
    }
  }
);
