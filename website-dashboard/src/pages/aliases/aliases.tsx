/* eslint-disable no-nested-ternary */
import { useDispatch } from "react-redux";
import AliasesListTile from "../../components/pages/aliases/aliasesListTile";
import AliasesListTitle from "../../components/pages/aliases/aliasesListTitle";
import SecondaryButton from "../../components/shared/secondaryButton/secondaryButton";
import ListLayout from "../../layouts/listLayout/listLayout";
import { openAliasesModal } from "../../redux/slices/modalSlice/modalSlice";
import { ReactComponent as AddIcon } from "./svgs/plus.svg";
import useFetchAliases from "./hooks/useFetchAliases";
import ErrorScreen from "../../components/shared/error/errorScreen";
import NoRecords from "../../components/shared/noRecords/noRecords";
import ListLoader from "../../components/shared/listLoader/listLoader";
import { useAppSelector } from "../../redux/store/store";

function Aliases() {
  const dispatch = useDispatch();
  const { error, loading } = useFetchAliases();

  const { aliases } = useAppSelector((state) => state.tempFetchedDataStore);

  const onClick = () => {
    dispatch(openAliasesModal());
  };

  const aliasesList = aliases.map((alias) => {
    return (
      <AliasesListTile
        key={alias.name}
        aliasName={alias.name}
        collectionName={alias.collection_name}
      />
    );
  });

  return (
    <>
      <div className="px-4 pt-4">
        <SecondaryButton text="Add Alias" onClick={onClick} Icon={AddIcon} />
      </div>
      <ListLayout>
        <AliasesListTitle />
        {error ? (
          <ErrorScreen />
        ) : !loading ? (
          aliases.length > 0 ? (
            aliasesList
          ) : (
            <NoRecords />
          )
        ) : (
          <ListLoader />
        )}
      </ListLayout>
    </>
  );
}

export default Aliases;
