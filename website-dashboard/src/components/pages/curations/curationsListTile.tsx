import clsx from "clsx";
import { useParams } from "react-router-dom";
// import useTypesenseAuth from "../../../hooks/useTypesenseAuth";
import { deleteCuration } from "../../../redux/slices/deletions/deletionAsyncThunks";
import { deleteAFetchedCuration } from "../../../redux/slices/tempStoreFetchedData/storeFetchedDataSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { ReactComponent as EditIcon } from "./svgs/edit.svg";
import { ReactComponent as Deleteicon } from "./svgs/trash.svg";

interface Props {
  curationQuery: string;
  curationMatchType: string;
  curationIncudes: number;
  curationExcludes: number;
  curationName: string;
}

function CurationsListTile({
  curationExcludes,
  curationIncudes,
  curationMatchType,
  curationQuery,
  curationName,
}: Props) {
  const dispatch = useAppDispatch();
  // const typesenseAuthData = useTypesenseAuth();
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );

  const { collectionName } = useParams();
  const className = clsx("font-lato text-sm ");
  const classNameFlex = clsx("flex items-center justify-center");

  const curationDelete = async () => {
    const payload = {
      typesenseAuthData: { apiKey, host, path, port, protocol },
      collectionName: collectionName || "",
      curationName,
    };
    await dispatch(deleteCuration(payload)).unwrap();
    dispatch(deleteAFetchedCuration({ curationName }));
  };
  return (
    <div className="grid grid-cols-5 gap-4 px-3 border-b-2 py-2 dark:text-gray-300 dark:border-gray-600">
      <div>
        <p className={className}>{curationQuery}</p>
      </div>
      <div className={classNameFlex}>
        <p className={className}>{curationMatchType}</p>
      </div>
      <div className={classNameFlex}>
        <p className={className}>{curationIncudes}</p>
      </div>
      <div className={classNameFlex}>
        <p className={className}>{curationExcludes}</p>
      </div>
      <div className={clsx(classNameFlex, "gap-5")}>
        <div>
          <EditIcon className="hover:cursor-pointer hover:scale-125 duration-100" />
        </div>
        <div>
          <Deleteicon
            className="text-red-600 hover:cursor-pointer hover:scale-125 duration-100"
            onClick={curationDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default CurationsListTile;
