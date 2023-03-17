import clsx from "clsx";
import { deleteAlias } from "../../../redux/slices/deletions/deletionAsyncThunks";
import { deleteAFetchedAlias } from "../../../redux/slices/tempStoreFetchedData/storeFetchedDataSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { ReactComponent as EditIcon } from "./svgs/edit.svg";
import { ReactComponent as Deleteicon } from "./svgs/trash.svg";

interface Props {
  aliasName: string;
  collectionName: string;
}

function AliasesListTile({ aliasName, collectionName }: Props) {
  const dispatch = useAppDispatch();
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );

  const aliasDelete = async () => {
    const payload = {
      typesenseAuthData: { apiKey, host, path, port, protocol },
      aliasName,
    };
    await dispatch(deleteAlias(payload)).unwrap();
    dispatch(deleteAFetchedAlias({ aliasName }));
  };

  const className = clsx("font-lato text-sm ");
  const classNameFlex = clsx("flex items-center justify-center");

  return (
    <div className="grid grid-cols-3 gap-4 px-3 border-b-2 py-2 dark:text-gray-300 dark:border-gray-600">
      <div>
        <p className={className}>{aliasName}</p>
      </div>

      <div className={classNameFlex}>
        <p className={className}>{collectionName}</p>
      </div>
      <div className={clsx(classNameFlex, "gap-5")}>
        <div>
          <EditIcon className="hover:cursor-pointer hover:scale-125 duration-100" />
        </div>
        <div>
          <Deleteicon
            className="text-red-600 hover:cursor-pointer hover:scale-125 duration-100"
            onClick={aliasDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default AliasesListTile;
