import { useEffect, useState } from "react";
import { CollectionAliasSchema } from "typesense/lib/Typesense/Aliases";
import TypesenseActions, {
  ITypesenseAuthData,
} from "../../../utils/typesenseActions";
import { useAppSelector } from "../../../redux/store/store";

const fetchAliases = async (authData: ITypesenseAuthData) => {
  const typesense = new TypesenseActions(authData);
  const aliases = await typesense.getAliases();
  return aliases;
};

const useFetchAliases = () => {
  const [aliases, setAliases] = useState<CollectionAliasSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );

  useEffect(() => {
    setLoading(true);
    fetchAliases({ apiKey, host, path, port, protocol })
      .then((response) => {
        setAliases(response.aliases);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiKey, host, path, port, protocol]);

  return { aliases, loading, error };
};

export default useFetchAliases;
