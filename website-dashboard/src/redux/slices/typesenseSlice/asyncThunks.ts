import { createAsyncThunk } from "@reduxjs/toolkit";
import { KeyCreateSchema } from "typesense/lib/Typesense/Key";
import { OverrideCreateSchema } from "typesense/lib/Typesense/Overrides";
import TypesenseActions, {
  ITypesenseAuthData,
} from "../../../utils/typesenseActions";

interface ICreateAPIKey {
  schema: KeyCreateSchema;
  authData: ITypesenseAuthData;
}
export const createAPIKey = createAsyncThunk(
  "typesense/createAPIKey",
  async ({ schema, authData }: ICreateAPIKey) => {
    const typesenseAPI = new TypesenseActions(authData); // Handle this more gracefully
    const response = await typesenseAPI.createAPIKey(schema);
    return response;
  }
);

interface ICreateSearchOnlyAPIKey {
  keySchema: KeyCreateSchema;
  authData: ITypesenseAuthData;
}
export const createSearchOnlyAPIKey = createAsyncThunk(
  "typesense/createSearchOnlyAPIKey",
  async ({ keySchema, authData }: ICreateSearchOnlyAPIKey) => {
    const typesenseAPI = new TypesenseActions(authData); // Handle this more gracefully
    const response = await typesenseAPI.createAPIKey(keySchema);
    return response;
  }
);

export const confirmHealth = createAsyncThunk(
  "typesense/confirmHealth",
  async (typesenseAuthData: ITypesenseAuthData) => {
    const typesenseAPI = new TypesenseActions(typesenseAuthData); // Handle this more gracefully
    try {
      const response = await typesenseAPI.getHealth();
      return response;
    } catch (error) {
      throw new Error("Could not connect to Typesense");
    }
  }
);

interface ICreateCuration {
  typesenseAuthData: ITypesenseAuthData;
  collectionName: string;
  curationDescription: string;
  curationSchema: OverrideCreateSchema;
}
export const createCuration = createAsyncThunk(
  "typesense/createCuration",
  async (createCurationData: ICreateCuration) => {
    const typesenseAPI = new TypesenseActions(
      createCurationData.typesenseAuthData
    ); // Handle this more gracefully
    try {
      const response = await typesenseAPI.createCuration(
        createCurationData.collectionName,
        createCurationData.curationDescription,
        createCurationData.curationSchema
      );
      return response;
    } catch (error) {
      throw new Error("Could not connect to Typesense");
    }
  }
);

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
interface ICreateAlias {
  typesenseAuthData: ITypesenseAuthData;
  aliasName: string;
  collectionName: string;
}
export const createAlias = createAsyncThunk(
  "typesense/createAlias",
  async (alias: ICreateAlias) => {
    const typesenseAPI = new TypesenseActions(alias.typesenseAuthData); // Handle this more gracefully
    try {
      const response = await typesenseAPI.createAlias(
        alias.aliasName,
        alias.collectionName
      );
      return response;
    } catch (error) {
      throw new Error("Could not create the alias");
    }
  }
);
