import { useState } from "react";
import Button from "../../../shared/button/button";
import ModalBackground from "../../../shared/modalBackground/modalBackground";
import { ReactComponent as Question } from "./svgs/question.svg";
import { ReactComponent as Cancel } from "./svgs/cancel.svg";
import { ReactComponent as Add } from "./svgs/plus.svg";
import { openAliasesModal } from "../../../../redux/slices/modalSlice/modalSlice";
import useFetchCollections from "../../collections/hooks/useCollections";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/store";
import { createAlias } from "../../../../redux/slices/typesenseSlice/asyncThunks";
import { addAlias } from "../../../../redux/slices/tempStoreFetchedData/storeFetchedDataSlice";

function AddAliasesModal() {
  const dispatch = useAppDispatch();
  const [aliasDescription, setAliasDescription] = useState("");
  const [collectionTarget, setCollectionTarget] = useState("");
  const [aliasDescriptionRequired, setAliasDescriptionRequired] =
    useState(false);
  const [collectionTargetRequired, setCollectionTargetRequired] =
    useState(false);
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );
  const { collections } = useFetchCollections();

  const closeModal = () => {
    dispatch(openAliasesModal());
  };

  const aliasCreate = async () => {
    if (!aliasDescription) {
      setAliasDescriptionRequired(true);
      return;
    }
    if (!collectionTarget) {
      setCollectionTargetRequired(true);
      return;
    }
    const typesenseAuthData = { apiKey, host, path, port, protocol };
    const createAliasObj = {
      typesenseAuthData,
      aliasName: aliasDescription,
      collectionName: collectionTarget,
    };
    await dispatch(createAlias(createAliasObj)).unwrap();
    dispatch(openAliasesModal());
    const alias = {
      collection_name: collectionTarget,
      name: aliasDescription,
    };
    dispatch(addAlias({ alias }));
  };

  return (
    <ModalBackground>
      <div className="bg-white rounded-md p-4 w-3/5 dark:bg-[#0d1117]">
        <div className="flex justify-between items-center mb-1">
          <div className="flex gap-1 items-start">
            <p className="font-bold font-lato text-lg dark:text-gray-300">
              Add Alias
            </p>
            <a
              href="https://typesense.org/docs/0.24.0/api/collection-alias.html#collection-alias"
              target="_blank"
              rel="noreferrer"
            >
              <Question className="w-3 h-3 cursor-pointer dark:text-gray-400" />
            </a>
          </div>
          <Cancel
            className="cursor-pointer w-7 h-7 dark:text-gray-300"
            onClick={closeModal}
          />
        </div>
        <p className="mb-2 font-lato text-gray-500">
          A virtual collection name that points to a real collection
        </p>
        <p className="font-lato font-bold text-sm pb-2 dark:text-gray-400">
          {" "}
          Name <span className="text-red-700">*</span>
        </p>
        {aliasDescriptionRequired ? (
          <p className="font-lato text-red-600 mb-1">Required</p>
        ) : null}{" "}
        <input
          type="text"
          className={`outline-none rounded-md ${
            aliasDescriptionRequired ? "border-2 border-red-600" : "border-2"
          } p-1 w-full mb-2 font-lato text-gray-500 dark:bg-[#010409] ${
            aliasDescriptionRequired
              ? "dark:border-red-600"
              : "dark:border-gray-600"
          }`}
          placeholder="Give the alias a name (required)"
          onChange={(e) => {
            setAliasDescriptionRequired(false);
            setAliasDescription(e.target.value);
          }}
        />
        <p className="font-lato font-bold text-sm pb-2 dark:text-gray-400">
          {" "}
          Target Collection <span className="text-red-700">*</span>
        </p>
        {collectionTargetRequired ? (
          <p className="font-lato text-red-600 mb-1">Required</p>
        ) : null}{" "}
        <select
          name="collection"
          id="collection"
          className="outline-none rounded-md border-2 p-1 w-36 mb-4 font-lato text-gray-500 dark:bg-[#010409] dark:border-gray-600"
          defaultValue="default"
          onChange={(e) => {
            setCollectionTargetRequired(false);
            setCollectionTarget(e.target.value);
          }}
        >
          <option disabled value="default">
            {" "}
            - select an option -{" "}
          </option>
          {collections.map((collection) => {
            return (
              <option key={collection.created_at} value={collection.name}>
                {collection.name}
              </option>
            );
          })}
        </select>
        <div className="flex justify-between my-3">
          <div />
          <Button text="Add Alias" Icon={Add} onClick={aliasCreate} />
        </div>
      </div>
    </ModalBackground>
  );
}

export default AddAliasesModal;
