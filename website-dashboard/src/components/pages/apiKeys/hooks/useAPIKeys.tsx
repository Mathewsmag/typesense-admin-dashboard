import { useEffect, useState } from "react";
import { KeySchema } from "typesense/lib/Typesense/Key";
// import useTypesenseAuth from "../../../../hooks/useTypesenseAuth";
import { setFetchedAPIKeys } from "../../../../redux/slices/tempStoreFetchedData/storeFetchedDataSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/store";
import TypesenseActions, {
  ITypesenseAuthData,
} from "../../../../utils/typesenseActions";

const fetchAPIKeys = async (authData: ITypesenseAuthData) => {
  const typesense = new TypesenseActions(authData);
  const apiKeys = await typesense.getAPIKeys();
  return apiKeys.keys;
};

interface KeyShemaRefresh extends KeySchema {
  value_prefix: string;
}

const useAPIKeys = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );
  // const typsenseAuthData = useTypesenseAuth();

  useEffect(() => {
    setLoading(true);
    fetchAPIKeys({ apiKey, host, path, port, protocol })
      .then((keys) => {
        dispatch(setFetchedAPIKeys(keys as KeyShemaRefresh[]));
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiKey, host, path, port, protocol, dispatch]);

  return { loading, error };
};

export default useAPIKeys;
