import { useAppSelector } from "../redux/store/store";

const useTypesenseAuth = () => {
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );

  const typesenseAuthData = {
    apiKey,
    host,
    path,
    port,
    protocol,
  };
  return typesenseAuthData;
};

export default useTypesenseAuth;
