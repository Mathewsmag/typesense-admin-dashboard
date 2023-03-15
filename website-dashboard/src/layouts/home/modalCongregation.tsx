import AddAliasesModal from "../../components/pages/aliases/addAliasesModal/addAliasesModal";
import AdminAPIKeyModal from "../../components/pages/apiKeys/adminAPIKeyModal/adminAPIKeyModal";
import AddCurationsModal from "../../components/pages/curations/addCurationsModal/addCurationsModal";
import AddSynonymModal from "../../components/pages/synonyms/addSynonymsModal/addSynonymModal";
import ApiKeyDisplayModal from "../../components/shared/APIKeyDisplayModal/apiKeyDisplayModal";
import SuccessOrFailureModal from "../../components/shared/successOrFailureModal/successOrFailureModal";
import {
  closeAPIKeyModal,
  restoreCollectionDeletedOrError,
  restoreCurationCreatedOrError,
} from "../../redux/slices/typesenseSlice/typesenseSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";

function ModalCongregation() {
  const dispatch = useAppDispatch();

  const {
    adminApiKeys,
    keysReturned,
    searchKeysReturned,
    searchAPIKeys,
    curationCreated,
    curationCreationError,
    collectionDeletedSuccessfully,
    collectionDeleteError,
  } = useAppSelector((state) => state.typesense);

  const {
    openCurationModal,
    openSynonymModal,
    openAdminAPIKeyModal,
    openAliasesModal,
  } = useAppSelector((state) => state.modal);

  const closeKeyModal = (adminOrSearch: "admin" | "search") => {
    dispatch(closeAPIKeyModal({ value: adminOrSearch }));
  };

  return (
    <>
      {keysReturned && (
        <ApiKeyDisplayModal
          apiKey={adminApiKeys.value || "No key"}
          onClick={() => closeKeyModal("admin")}
        />
      )}
      {searchKeysReturned && (
        <ApiKeyDisplayModal
          apiKey={searchAPIKeys.value || "No key"}
          onClick={() => closeKeyModal("search")}
        />
      )}
      {openCurationModal && <AddCurationsModal />}
      {openSynonymModal && <AddSynonymModal />}
      {openAdminAPIKeyModal && <AdminAPIKeyModal />}
      {openAliasesModal && <AddAliasesModal />}
      {curationCreated && (
        <SuccessOrFailureModal
          content="Curation created successfully"
          onClick={() => {
            dispatch(restoreCurationCreatedOrError());
          }}
        />
      )}
      {curationCreationError && (
        <SuccessOrFailureModal
          content="There was an error creating the curation"
          isError
          onClick={() => {
            dispatch(restoreCurationCreatedOrError());
          }}
        />
      )}
      {collectionDeletedSuccessfully && (
        <SuccessOrFailureModal
          content="The collection was deleted successfully"
          onClick={() => {
            dispatch(restoreCollectionDeletedOrError());
          }}
        />
      )}
      {collectionDeleteError && (
        <SuccessOrFailureModal
          content="There was an error deleting the collection"
          isError
          onClick={() => {
            dispatch(restoreCollectionDeletedOrError());
          }}
        />
      )}
    </>
  );
}

export default ModalCongregation;
