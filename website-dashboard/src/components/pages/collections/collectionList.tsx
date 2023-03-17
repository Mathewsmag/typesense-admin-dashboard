/* eslint-disable no-nested-ternary */
import ListLayout from "../../../layouts/listLayout/listLayout";
import ErrorScreen from "../../shared/error/errorScreen";
import NoRecords from "../../shared/noRecords/noRecords";
import CollectionListTiles from "./collectionListTile";
import CollectionListTitle from "./collectionListTitle";
import useFetchCollections from "./hooks/useCollections";
import ListLoader from "../../shared/listLoader/listLoader";

function CollectionList() {
  const { collections, error, loading } = useFetchCollections();

  const collectionsList = collections.map((collection) => {
    return (
      <CollectionListTiles
        key={collection.created_at}
        collectionName={collection.name}
        collectionCreatedAt={collection.created_at}
        collectionDocuments={collection.num_documents}
        collectionSchemaFields={collection.fields?.length || 0}
      />
    );
  });

  return (
    <ListLayout>
      <CollectionListTitle />
      {error ? (
        <ErrorScreen />
      ) : !loading ? (
        collections.length > 0 ? (
          collectionsList
        ) : (
          <NoRecords />
        )
      ) : (
        <ListLoader />
      )}
    </ListLayout>
  );
}

export default CollectionList;
