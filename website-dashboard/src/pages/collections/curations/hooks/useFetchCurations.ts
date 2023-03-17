import { useEffect, useState } from "react";
import { setFetchedCuration } from "../../../../redux/slices/tempStoreFetchedData/storeFetchedDataSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/store";
import TypesenseActions, {
  ITypesenseAuthData,
} from "../../../../utils/typesenseActions";

const fetchCurations = async (
  collectionName: string,
  authData: ITypesenseAuthData
) => {
  const typesense = new TypesenseActions(authData);
  const curations = await typesense.getCurations(collectionName);
  return curations;
};

const useFetchCurations = (collectionName: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const dispatch = useAppDispatch();
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );

  useEffect(() => {
    setLoading(true);
    fetchCurations(collectionName, { apiKey, host, path, port, protocol })
      .then((response) => {
        dispatch(setFetchedCuration(response.overrides));
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [collectionName, apiKey, host, path, port, protocol, dispatch]);

  return { loading, error };
};

export default useFetchCurations;
