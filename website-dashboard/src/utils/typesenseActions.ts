import Typesense, { Client } from "typesense";
import {
  CollectionAliasesResponseSchema,
  CollectionAliasSchema,
} from "typesense/lib/Typesense/Aliases";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { HealthResponse } from "typesense/lib/Typesense/Health";
import { KeyCreateSchema, KeySchema } from "typesense/lib/Typesense/Key";
import { KeysRetrieveSchema } from "typesense/lib/Typesense/Keys";
import { OverrideSchema } from "typesense/lib/Typesense/Override";
import {
  OverrideCreateSchema,
  OverridesRetrieveSchema,
} from "typesense/lib/Typesense/Overrides";
import ITypesenseActions from "./typesenseActionsInterface";

export interface ITypesenseAuthData {
  apiKey: string;
  protocol: string;
  port: number;
  host: string;
  path: string;
}

export default class TypesenseActions implements ITypesenseActions {
  private client: Client;

  constructor(public AuthData: ITypesenseAuthData) {
    this.client = new Typesense.Client({
      nodes: [
        {
          host: AuthData.host,
          port: AuthData.port,
          protocol: AuthData.protocol,
        },
      ],
      apiKey: AuthData.apiKey,
      connectionTimeoutSeconds: 2,
    });
  }

  createAlias(
    aliasName: string,
    collectionName: string
  ): Promise<CollectionAliasSchema> {
    const aliasedCollection = {
      collection_name: collectionName,
    };
    return this.client.aliases().upsert(aliasName, aliasedCollection);
  }

  getAliases(): Promise<CollectionAliasesResponseSchema> {
    return this.client.aliases().retrieve();
  }

  deleteCollection(collectionName: string): Promise<CollectionSchema> {
    return this.client.collections(collectionName).delete();
  }

  createCuration(
    collectionName: string,
    curationDescription: string,
    curationSchema: OverrideCreateSchema
  ): Promise<OverrideSchema> {
    return this.client
      .collections(collectionName)
      .overrides()
      .upsert(curationDescription, curationSchema);
  }

  async getHealth(): Promise<HealthResponse> {
    // const url = `${this.AuthData.protocol}://${this.AuthData.host}:${this.AuthData.port}${this.AuthData.path}/metrics.json`;
    try {
      const healthResponse = await this.client.health.retrieve();
      await this.client.metrics.retrieve();
      // const options = {
      //   method: "GET",
      //   headers: {
      //     "X-TYPESENSE-API-KEY": this.AuthData.apiKey,
      //   },
      // };
      // const res = await fetch(url, options);
      // const newres = res.json();

      return healthResponse;
    } catch (error) {
      throw new Error();
    }
  }

  createAPIKey(keySchema: KeyCreateSchema): Promise<KeySchema> {
    return this.client.keys().create(keySchema);
  }

  getAPIKeys(): Promise<KeysRetrieveSchema> {
    return this.client.keys().retrieve();
  }

  getCollections(): Promise<CollectionSchema[]> {
    return this.client.collections().retrieve();
  }

  getCollectionSchema(collectionName: string): Promise<CollectionSchema> {
    return this.client.collections(collectionName).retrieve();
  }

  getCurations(collectionName: string): Promise<OverridesRetrieveSchema> {
    return this.client.collections(collectionName).overrides().retrieve();
  }
}
