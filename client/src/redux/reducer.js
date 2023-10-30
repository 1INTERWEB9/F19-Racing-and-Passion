/* eslint-disable no-case-declarations */
import {
  GET_DRIVERS,
  ERROR_GET_DRIVERS,
  CLEAN_DRIVERS,
  GET_SINGLE_DRIVER,
} from "./action_types";

const initialState = {
  allDrivers: [],
  drivers: [],
  singleDriver: [],
  infoAPI: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload.data,
        drivers: action.payload.data,
        infoAPI: action.payload.information,
      };
    case ERROR_GET_DRIVERS:
      return {
        ...state,
        drivers: action.payload.results,
      };
    case CLEAN_DRIVERS:
      return {
        ...state,
        allDrivers: [],
        drivers: [],
        singleDriver: [],
        infoAPI: [],
      };
    case GET_SINGLE_DRIVER:
      return {
        ...state,
        singleDriver: action.payload,
      };
    default:
      return { ...state };
  }
};

export default reducer;
