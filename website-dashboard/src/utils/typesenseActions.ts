/* eslint-disable no-constructor-return */
/* eslint-disable @typescript-eslint/no-this-alias */
import Typesense, { Client } from "typesense";
import {
  CollectionAliasesResponseSchema,
  CollectionAliasSchema,
} from "typesense/lib/Typesense/Aliases";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { HealthResponse } from "typesense/lib/Typesense/Health";
import {
  KeyCreateSchema,
  KeyDeleteSchema,
  KeySchema,
} from "typesense/lib/Typesense/Key";
import { KeysRetrieveSchema } from "typesense/lib/Typesense/Keys";
import {
  OverrideDeleteSchema,
  OverrideSchema,
} from "typesense/lib/Typesense/Override";
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

let instance: TypesenseActions | null = null;
export default class TypesenseActions implements ITypesenseActions {
  private client: Client | undefined;

  constructor(public AuthData: ITypesenseAuthData) {
    if (instance) {
      return instance;
    }
    instance = this;

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

  deleteCuration(
    collectionName: string,
    curationName: string
  ): Promise<OverrideDeleteSchema> {
    if (!this.client) throw new Error("Client not initialized");
    return this.client
      .collections(collectionName)
      .overrides(curationName)
      .delete();
  }

  deleteAlias(aliasName: string): Promise<CollectionAliasSchema> {
    if (!this.client) throw new Error("Client not initialized");
    return this.client.aliases(aliasName).delete();
  }

  deleteAPIKey(keyId: number): Promise<KeyDeleteSchema> {
    if (!this.client) throw new Error("Client not initialized");
    return this.client.keys(keyId).delete();
  }

  createAlias(
    aliasName: string,
    collectionName: string
  ): Promise<CollectionAliasSchema> {
    const aliasedCollection = {
      collection_name: collectionName,
    };
    if (!this.client) throw new Error("Client not initialized");
    return this.client.aliases().upsert(aliasName, aliasedCollection);
  }

  getAliases(): Promise<CollectionAliasesResponseSchema> {
    if (!this.client) throw new Error("Client not initialized");
    return this.client.aliases().retrieve();
  }

  deleteCollection(collectionName: string): Promise<CollectionSchema> {
    if (!this.client) throw new Error("Client not initialized");
    return this.client.collections(collectionName).delete();
  }

  createCuration(
    collectionName: string,
    curationDescription: string,
    curationSchema: OverrideCreateSchema
  ): Promise<OverrideSchema> {
    if (!this.client) throw new Error("Client not initialized");
    return this.client
      .collections(collectionName)
      .overrides()
      .upsert(curationDescription, curationSchema);
  }

  async getHealth(): Promise<HealthResponse> {
    if (!this.client) throw new Error("Client not initialized");
    try {
      const healthResponse = await this.client.health.retrieve();
      await this.client.metrics.retrieve();
      return healthResponse;
    } catch (error) {
      throw new Error();
    }
  }

  createAPIKey(keySchema: KeyCreateSchema): Promise<KeySchema> {
    if (!this.client) throw new Error("Client not initialized");
    return this.client.keys().create(keySchema);
  }

  getAPIKeys(): Promise<KeysRetrieveSchema> {
    if (!this.client) throw new Error("Client not initialized");
    return this.client.keys().retrieve();
  }

  getCollections(): Promise<CollectionSchema[]> {
    if (!this.client) throw new Error("Client not initialized");
    return this.client.collections().retrieve();
  }

  getCollectionSchema(collectionName: string): Promise<CollectionSchema> {
    if (!this.client) throw new Error("Client not initialized");
    return this.client.collections(collectionName).retrieve();
  }

  getCurations(collectionName: string): Promise<OverridesRetrieveSchema> {
    if (!this.client) throw new Error("Client not initialized");
    return this.client.collections(collectionName).overrides().retrieve();
  }
}
