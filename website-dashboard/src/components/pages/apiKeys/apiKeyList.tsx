/* eslint-disable no-nested-ternary */
import ListLayout from "../../../layouts/listLayout/listLayout";
import ErrorScreen from "../../shared/error/errorScreen";
import ListLoader from "../../shared/listLoader/listLoader";
import NoRecords from "../../shared/noRecords/noRecords";
import ApiKeyListTile from "./apiKeyListtile";
import ApiKeyListTitle from "./apiKeyListTitle";

import useAPIKeys from "./hooks/useAPIKeys";

function ApiKeyList() {
  const { apiKeys, error, loading } = useAPIKeys();
  const apiKeysList = apiKeys.map((apiKey) => {
    return (
      <ApiKeyListTile
        key={apiKey.id}
        uniqueId={apiKey.id}
        keyPrefix={apiKey.value_prefix || "No key"}
        description={apiKey.description || "No description"}
        expiresAt={apiKey.expires_at || 0}
      />
    );
  });
  return (
    <ListLayout>
      <ApiKeyListTitle />
      {error ? (
        <ErrorScreen />
      ) : !loading ? (
        apiKeys.length > 0 ? (
          apiKeysList
        ) : (
          <NoRecords />
        )
      ) : (
        <ListLoader />
      )}
    </ListLayout>
  );
}

export default ApiKeyList;
