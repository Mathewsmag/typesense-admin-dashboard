import Editor from "@monaco-editor/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../shared/loading/loading";
import ModalBackground from "../../../shared/modalBackground/modalBackground";
import { ReactComponent as Question } from "./svgs/question.svg";
import { ReactComponent as Cancel } from "./svgs/cancel.svg";
import { ReactComponent as Add } from "./svgs/plus.svg";
import { openCurationsModal } from "../../../../redux/slices/modalSlice/modalSlice";
import Button from "../../../shared/button/button";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/store";
import curationTemplate from "./curationTemplate";
import { createCuration } from "../../../../redux/slices/typesenseSlice/asyncThunks";

function AddCurationsModal() {
  const dispatch = useAppDispatch();
  const { collectionName } = useParams();
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );
  const [curationSchema, setCuration] = useState(curationTemplate);
  const [curationDescription, setCurationDescription] = useState("");
  const [collectionDescriptionRequired, setCollectionDescriptionRequired] =
    useState(false);

  const onChange = (value: any) => {
    setCuration(value);
  };

  const closeModal = () => {
    dispatch(openCurationsModal());
  };

  const { theme } = useAppSelector((state) => state.theme);

  const addCuration = async () => {
    if (!curationDescription) {
      setCollectionDescriptionRequired(true);
      return;
    }

    const typesenseAuthData = { apiKey, host, path, port, protocol };
    const curationData = {
      typesenseAuthData,
      curationSchema,
      curationDescription,
      collectionName: collectionName || "",
    };
    await dispatch(createCuration(curationData)).unwrap();
    dispatch(openCurationsModal());
  };

  return (
    <ModalBackground>
      <div className="bg-white rounded-md p-4 w-3/5 h-[510px] dark:bg-[#0d1117]">
        <div className="flex justify-between items-center mb-1">
          <div className="flex gap-1 items-start">
            <p className="font-bold font-lato text-lg dark:text-gray-300">
              Add Curation
            </p>
            <a
              href="https://typesense.org/docs/0.24.0/api/curation.html#create-or-update-an-override"
              target="_blank"
              rel="noreferrer"
            >
              <Question className="w-3 h-3 cursor-pointer dark:text-gray-300" />
            </a>
          </div>
          <Cancel
            className="cursor-pointer w-7 h-7 dark:text-gray-300"
            onClick={closeModal}
          />
        </div>
        <p className="mb-2 font-lato text-gray-500">
          Using overrides, you can include or exclude specific documents for a
          given query.
        </p>
        {collectionDescriptionRequired ? (
          <p className="font-lato text-red-600 mb-1">Required</p>
        ) : null}{" "}
        <input
          type="text"
          className={`outline-none rounded-md ${
            collectionDescriptionRequired
              ? "border-2 border-red-600"
              : "border-2"
          } p-1 w-full mb-2 font-lato text-gray-500 dark:bg-[#010409] ${
            collectionDescriptionRequired
              ? "dark:border-red-600"
              : "dark:border-gray-600"
          }`}
          placeholder="Give the curation a name (required)"
          onChange={(e) => {
            setCollectionDescriptionRequired(false);
            setCurationDescription(e.target.value);
          }}
        />
        <Editor
          height="310px"
          defaultLanguage="json"
          defaultValue={JSON.stringify(curationSchema, null, 2)}
          onChange={onChange}
          loading={<Loading />}
          theme={theme === "dark" ? "vs-dark" : "light"} // light, vs-dark, hc-black
        />
        <div className="flex justify-between my-3">
          <div />
          <Button text="Add Curation" Icon={Add} onClick={addCuration} />
        </div>
      </div>
    </ModalBackground>
  );
}

export default AddCurationsModal;
