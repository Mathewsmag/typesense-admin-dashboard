/* eslint-disable no-nested-ternary */
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { OverrideRuleQuerySchema } from "typesense/lib/Typesense/Overrides";
import SecondaryButton from "../../../components/shared/secondaryButton/secondaryButton";
import { openCurationsModal } from "../../../redux/slices/modalSlice/modalSlice";
import CurationsListTile from "../../../components/pages/curations/curationsListTile";
import CurationsListTitle from "../../../components/pages/curations/curationsListTitle";
import ListLayout from "../../../layouts/listLayout/listLayout";
import { ReactComponent as AddIcon } from "./svgs/add.svg";
import useFetchCurations from "./hooks/useFetchCurations";
import NoRecords from "../../../components/shared/noRecords/noRecords";
import ErrorScreen from "../../../components/shared/error/errorScreen";
import ListLoader from "../../../components/shared/listLoader/listLoader";
import { useAppSelector } from "../../../redux/store/store";

function Curations() {
  const dispatch = useDispatch();
  const { collectionName } = useParams();
  const onClick = () => {
    dispatch(openCurationsModal());
  };
  const { loading, error } = useFetchCurations(collectionName || "");
  const { curations } = useAppSelector((state) => state.tempFetchedDataStore);

  const getQuery = (
    query: OverrideRuleQuerySchema,
    requestParam: "query" | "match"
  ) => {
    interface OverrideSchemaRefresh extends OverrideRuleQuerySchema {
      query: string;
      match: "exact" | "contains";
    }
    const override = query as OverrideSchemaRefresh;

    switch (requestParam) {
      case "query":
        return override.query;
      case "match":
        return override.match;
      default:
        return "";
    }
  };

  const curationList = curations.map((override) => {
    return (
      <CurationsListTile
        key={override.id}
        curationQuery={getQuery(
          override.rule as OverrideRuleQuerySchema,
          "query"
        )}
        curationMatchType={getQuery(
          override.rule as OverrideRuleQuerySchema,
          "match"
        )}
        curationIncudes={override.includes?.length || 0}
        curationExcludes={override.excludes?.length || 0}
        curationName={override.id}
      />
    );
  });

  return (
    <>
      <div className="">
        <SecondaryButton
          Icon={AddIcon}
          text="Add a Curation"
          onClick={onClick}
        />
      </div>
      <ListLayout>
        <CurationsListTitle />
        {error ? (
          <ErrorScreen />
        ) : !loading ? (
          curations.length > 0 ? (
            curationList
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

export default Curations;
