// react imports
import { useState, useEffect } from "react";

// redux imports
import { useGetRetirementStatementTypeQuery } from "../slices/sharedApiSlice.js";
import {
  useGetLookupDataQuery,
  useGetPensionaryStatusQuery,
  useGetRelationshipQuery,
} from "../slices/sharedApiSlice.js";

/**
 * Custom hook to fetch lookup data based on the specified type.
 *
 * @param {Object} params - Parameters for the hook.
 * @param {string} params.lookUpType - The type of lookup data to fetch.
 *
 * @returns {Object} An object containing the following properties:
 * - `lookUpItems` {Array}: The list of fetched lookup items.
 * - `lookUpItemsIsLoading` {boolean}: A flag indicating if the data is currently loading.
 * - `lookUpItemsIsFetching` {boolean}: A flag indicating if the data is being fetched.
 */

// COMMON LOOK UP DATA LOGIC
const useFetchLookUpData = ({ lookUpType }) => {
  const [lookUpItems, setLookUpItems] = useState([]);

  // GET DATA
  const {
    data: lookUpItemsData,
    isSuccess: lookUpItemsIsSuccess,
    isLoading: lookUpItemsIsLoading,
    isFetching: lookUpItemsIsFetching,
    error: lookUpItemsError,
  } = useGetLookupDataQuery({ lookUpType });

  // FETCH DATA
  useEffect(() => {
    if (lookUpItemsIsSuccess) {
      setLookUpItems(lookUpItemsData.itemList);
    }
  }, [lookUpItemsIsSuccess, lookUpItemsData]);

  // HANDLE ERROR
  useEffect(() => {
    if (lookUpItemsError) {
      console.log(lookUpItemsError);
    }
  }, [lookUpItemsError]);

  return {
    lookUpItems,
    lookUpItemsIsLoading,
    lookUpItemsIsFetching,
  };
};

// STATEMENT TYPES LOOK UP LOGIC
const useFetchRetirementStatementTypes = () => {
  const [statementTypes, setStatementTypes] = useState([]);

  // GET DATA
  const {
    data: statementTypesItems,
    isSuccess: statementTypesIsSuccess,
    isFetching: statementTypesIsFetching,
    isLoading: statementTypesIsLoading,
    error: statementTypesError,
  } = useGetRetirementStatementTypeQuery({});

  // FETCH DATA
  useEffect(() => {
    if (statementTypesIsSuccess) {
      setStatementTypes(statementTypesItems.itemList);
    }
  }, [statementTypesIsSuccess, statementTypesItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (statementTypesError) {
      console.log(statementTypesError);
    }
  }, [statementTypesError]);

  return {
    statementTypes,
    statementTypesIsFetching,
    statementTypesIsLoading,
  };
};

// PENSIONARY STATUS LOOK UP LOGIC
const useFetchPensionaryStatus = ({
  pensionaryStatusCategory,
  pensionaryStatusIsDead = undefined,
}) => {
  const [pensionaryStatus, setPensionaryStatus] = useState([]);

  // GET DATA
  const {
    data: pensionaryStatusItems,
    isSuccess: pensionaryStatusIsSuccess,
    isLoading: pensionaryStatusIsLoading,
    isFetching: pensionaryStatusIsFetching,
    error: pensionaryStatusError,
  } = useGetPensionaryStatusQuery({
    pensionaryStatusCategory,
    pensionaryStatusIsDead,
  });

  // FETCH DATA
  useEffect(() => {
    if (pensionaryStatusIsSuccess) {
      setPensionaryStatus(pensionaryStatusItems.itemList);
    }
  }, [pensionaryStatusIsSuccess, pensionaryStatusItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (pensionaryStatusError) {
      console.log(pensionaryStatusError);
    }
  }, [pensionaryStatusError]);

  return {
    pensionaryStatus,
    pensionaryStatusIsLoading,
    pensionaryStatusIsFetching,
  };
};

// RELATIONSHIP LOOK UP LOGIC
const useFetchRelationship = () => {
  const [relationships, setRelationships] = useState([]);

  // GET DATA
  const {
    data: relationshipItems,
    isSuccess: relationshipIsSuccess,
    isLoading: relationshipIsLoading,
    isFetching: relationshipIsFetching,
    error: relationshipError,
  } = useGetRelationshipQuery({});

  // FETCH DATA
  useEffect(() => {
    if (relationshipIsSuccess) {
      setRelationships(relationshipItems.itemList);
    }
  }, [relationshipIsSuccess, relationshipItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (relationshipError) {
      console.log(relationshipError);
    }
  }, [relationshipError]);

  return {
    relationships,
    relationshipIsLoading,
    relationshipIsFetching,
  };
};

export {
  useFetchRetirementStatementTypes,
  useFetchPensionaryStatus,
  useFetchLookUpData,
  useFetchRelationship,
};
