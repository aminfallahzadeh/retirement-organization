// react imports
import { useState, useEffect } from "react";

// redux imports
import { useGetRetirementStatementTypeQuery } from "../slices/sharedApiSlice.js";
import {
  useGetLookupDataQuery,
  useGetPensionaryStatusQuery,
} from "../slices/sharedApiSlice.js";

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
  pensionaryStatusIsDead,
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

// GENDER LOOK UP LOGIC
const useFetchGenders = () => {
  const [genders, setGenders] = useState([]);

  // GET DATA
  const {
    data: genderItems,
    isSuccess: isGenderItemsSuccess,
    isLoading: isGenderItemsLoading,
    isFetching: isGenderItemsFetching,
    error: genderError,
  } = useGetLookupDataQuery({
    lookUpType: "Gender",
  });

  // FETCH DATA
  useEffect(() => {
    if (isGenderItemsSuccess) {
      setGenders(genderItems.itemList);
    }
  }, [isGenderItemsSuccess, genderItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (genderError) {
      console.log(genderError);
    }
  }, [genderError]);

  return {
    genders,
    isGenderItemsLoading,
    isGenderItemsFetching,
  };
};

// EDUCATION DEGREE LOOK UP LOGIC
const useFetchEducationTypes = () => {
  const [educationTypes, setEducationTypes] = useState([]);

  // GET DATA
  const {
    data: educationTypesItems,
    isSuccess: educationTypesIsSuccess,
    isLoading: educationTypesIsLoading,
    isFetching: educationTypesIsFetching,
    error: educationTypesError,
  } = useGetLookupDataQuery({
    lookUpType: "EducationType",
  });

  // FETCH DATA
  useEffect(() => {
    if (educationTypesIsSuccess) {
      setEducationTypes(educationTypesItems.itemList);
    }
  }, [educationTypesIsSuccess, educationTypesItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (educationTypesError) {
      console.log(educationTypesError);
    }
  }, [educationTypesError]);

  return {
    educationTypes,
    educationTypesIsLoading,
    educationTypesIsFetching,
  };
};

// COUNTRY LOOK UP LOGIC
const useFetchCountries = () => {
  const [countries, setCountries] = useState([]);

  // GET DATA
  const {
    data: countriesItems,
    isSuccess: countriesIsSuccess,
    isLoading: countriesIsLoading,
    isFetching: countriesIsFetching,
    error: countriesError,
  } = useGetLookupDataQuery({
    lookUpType: "Country",
  });

  // FETCH DATA
  useEffect(() => {
    if (countriesIsSuccess) {
      setCountries(countriesItems.itemList);
    }
  }, [countriesIsSuccess, countriesItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (countriesError) {
      console.log(countriesError);
    }
  }, [countriesError]);

  return {
    countries,
    countriesIsLoading,
    countriesIsFetching,
  };
};

// STATE LOOK UP LOGIC
const useFetchStates = () => {
  const [states, setStates] = useState([]);

  // GET DATA
  const {
    data: statesItems,
    isSuccess: statesIsSuccess,
    isLoading: statesIsLoading,
    isFetching: statesIsFetching,
    error: statesError,
  } = useGetLookupDataQuery({
    lookUpType: "State",
  });

  // FETCH DATA
  useEffect(() => {
    if (statesIsSuccess) {
      setStates(statesItems.itemList);
    }
  }, [statesIsSuccess, statesItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (statesError) {
      console.log(statesError);
    }
  }, [statesError]);

  return {
    states,
    statesIsLoading,
    statesIsFetching,
  };
};

// CITY LOOK UP LOGIC
const useFetchCities = () => {
  const [cities, setCities] = useState([]);

  // GET DATA
  const {
    data: citiesItems,
    isSuccess: citiesIsSuccess,
    isLoading: citiesIsLoading,
    isFetching: citiesIsFetching,
    error: citiesError,
  } = useGetLookupDataQuery({
    lookUpType: "City",
  });

  // FETCH DATA
  useEffect(() => {
    if (citiesIsSuccess) {
      setCities(citiesItems.itemList);
    }
  }, [citiesIsSuccess, citiesItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (citiesError) {
      console.log(citiesError);
    }
  }, [citiesError]);

  return {
    cities,
    citiesIsLoading,
    citiesIsFetching,
  };
};

// HOUSING TYPES LOOK UP LOGIC
const useFetchHousingTypes = () => {
  const [housingTypes, setHousingTypes] = useState([]);

  // GET DATA
  const {
    data: housingTypesItems,
    isSuccess: housingTypesIsSuccess,
    isLoading: housingTypesIsLoading,
    isFetching: housingTypesIsFetching,
    error: housingTypesError,
  } = useGetLookupDataQuery({
    lookUpType: "HousingType",
  });

  // FETCH DATA
  useEffect(() => {
    if (housingTypesIsSuccess) {
      setHousingTypes(housingTypesItems.itemList);
    }
  }, [housingTypesIsSuccess, housingTypesItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (housingTypesError) {
      console.log(housingTypesError);
    }
  }, [housingTypesError]);

  return {
    housingTypes,
    housingTypesIsLoading,
    housingTypesIsFetching,
  };
};

// MARITAL STATUS LOOK UP LOGIC
const useFetchMaritalStatus = () => {
  const [maritalStatusItems, setMaritalStatusItems] = useState([]);

  // GET DATA
  const {
    data: maritalStatusItemsData,
    isSuccess: maritalStatusItemsIsSuccess,
    isLoading: maritalStatusItemsIsLoading,
    isFetching: maritalStatusItemsIsFetching,
    error: maritalStatusItemsError,
  } = useGetLookupDataQuery({
    lookUpType: "MaritialStatus",
  });

  // FETCH DATA
  useEffect(() => {
    if (maritalStatusItemsIsSuccess) {
      setMaritalStatusItems(maritalStatusItemsData.itemList);
    }
  }, [maritalStatusItemsIsSuccess, maritalStatusItemsData]);

  // HANDLE ERROR
  useEffect(() => {
    if (maritalStatusItemsError) {
      console.log(maritalStatusItemsError);
    }
  }, [maritalStatusItemsError]);

  return {
    maritalStatusItems,
    maritalStatusItemsIsLoading,
    maritalStatusItemsIsFetching,
  };
};

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

export {
  useFetchGenders,
  useFetchRetirementStatementTypes,
  useFetchEducationTypes,
  useFetchCountries,
  useFetchStates,
  useFetchCities,
  useFetchHousingTypes,
  useFetchMaritalStatus,
  useFetchPensionaryStatus,
  useFetchLookUpData,
};
