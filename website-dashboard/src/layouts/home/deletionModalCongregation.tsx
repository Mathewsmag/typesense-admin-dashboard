import SuccessOrFailureModal from "../../components/shared/successOrFailureModal/successOrFailureModal";
import {
  restoreCollectionDeletedOrError,
  restoreAPIKeyDeletedOrError,
} from "../../redux/slices/deletions/deletionsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";

function DeletionModalCongregation() {
  const dispatch = useAppDispatch();
  const {
    collectionDeleteError,
    collectionDeletedSuccessfully,
    apiKeyDeletedSuccessfully,
    apiKeyDeleteError,
  } = useAppSelector((state) => state.deletions);

  return (
    <>
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
      {/* APIKey deletion */}
      {apiKeyDeletedSuccessfully && (
        <SuccessOrFailureModal
          content="The API key was deleted successfully"
          onClick={() => {
            dispatch(restoreAPIKeyDeletedOrError());
          }}
        />
      )}
      {apiKeyDeleteError && (
        <SuccessOrFailureModal
          content="There was an error deleting the API key"
          isError
          onClick={() => {
            dispatch(restoreAPIKeyDeletedOrError());
          }}
        />
      )}
    </>
  );
}

export default DeletionModalCongregation;
