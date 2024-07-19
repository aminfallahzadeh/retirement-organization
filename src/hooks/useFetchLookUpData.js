// react imports
import { useState, useEffect } from "react";

// redux imports
import { useGetRetirementStatementTypeQuery } from "../slices/sharedApiSlice.js";
import { useGetLookupDataQuery } from "../slices/sharedApiSlice.js";

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

export {
  useFetchGenders,
  useFetchRetirementStatementTypes,
  useFetchEducationTypes,
  useFetchCountries,
  useFetchStates,
  useFetchCities,
  useFetchHousingTypes,
  useFetchMaritalStatus,
};
