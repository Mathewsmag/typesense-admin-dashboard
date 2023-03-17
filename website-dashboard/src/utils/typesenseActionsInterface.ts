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

interface ITypesenseActions {
  getCollectionSchema(collectionName: string): Promise<CollectionSchema>;

  getCollections(): Promise<CollectionSchema[]>;

  getCurations(collectionName: string): Promise<OverridesRetrieveSchema>;

  getAPIKeys(): Promise<KeysRetrieveSchema>;

  createAPIKey(keySchema: KeyCreateSchema): Promise<KeySchema>;

  getHealth(): Promise<HealthResponse>;

  createCuration(
    collectionName: string,
    curationDescription: string,
    curationSchema: OverrideCreateSchema
  ): Promise<OverrideSchema>;

  deleteCollection(collectionName: string): Promise<CollectionSchema>;

  getAliases(): Promise<CollectionAliasesResponseSchema>;

  createAlias(
    aliasName: string,
    collectionName: string
  ): Promise<CollectionAliasSchema>;

  deleteAPIKey(keyId: number): Promise<KeyDeleteSchema>;

  deleteAlias(aliasName: string): Promise<CollectionAliasSchema>;

  deleteCuration(
    collectionName: string,
    curationName: string
  ): Promise<OverrideDeleteSchema>;
}

export default ITypesenseActions;
