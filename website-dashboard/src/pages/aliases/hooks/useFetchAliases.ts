import { useEffect, useState } from "react";
import TypesenseActions, {
  ITypesenseAuthData,
} from "../../../utils/typesenseActions";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { setFetchedAliases } from "../../../redux/slices/tempStoreFetchedData/storeFetchedDataSlice";

const fetchAliases = async (authData: ITypesenseAuthData) => {
  const typesense = new TypesenseActions(authData);
  const aliases = await typesense.getAliases();
  return aliases;
};

const useFetchAliases = () => {
  const dispatch = useAppDispatch();
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    fetchAliases({ apiKey, host, path, port, protocol })
      .then((response) => {
        dispatch(setFetchedAliases(response.aliases));
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

export default useFetchAliases;
