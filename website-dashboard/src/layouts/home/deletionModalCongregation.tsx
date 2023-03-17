import SuccessOrFailureModal from "../../components/shared/successOrFailureModal/successOrFailureModal";
import {
  restoreCollectionDeletedOrError,
  restoreAPIKeyDeletedOrError,
  restoreCurationDeletedOrError,
} from "../../redux/slices/deletions/deletionsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";

function DeletionModalCongregation() {
  const dispatch = useAppDispatch();
  const {
    collectionDeleteError,
    collectionDeletedSuccessfully,
    apiKeyDeletedSuccessfully,
    apiKeyDeleteError,
    curationsDeletedSuccessfully,
    curationsDeleteError,
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
      {/* curations deletion */}
      {curationsDeletedSuccessfully && (
        <SuccessOrFailureModal
          content="The curation was deleted successfully"
          onClick={() => {
            dispatch(restoreCurationDeletedOrError());
          }}
        />
      )}
      {curationsDeleteError && (
        <SuccessOrFailureModal
          content="There was an error deleting the curation"
          isError
          onClick={() => {
            dispatch(restoreCurationDeletedOrError());
          }}
        />
      )}
    </>
  );
}

export default DeletionModalCongregation;
