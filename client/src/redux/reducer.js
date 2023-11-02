/* eslint-disable no-case-declarations */
import {
  GET_DRIVERS,
  ERROR_GET_DRIVERS,
  CLEAN_DRIVERS,
  GET_SINGLE_DRIVER,
  ENABLED_WAIT_PAGE,
} from "./action_types";

const initialState = {
  allDrivers: [],
  drivers: [],
  singleDriver: [],
  infoAPI: [],
  waitPage: true,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        drivers: action.payload.data,
        infoAPI: action.payload.information,
        waitPage: false,
        error: false,
      };
    case ERROR_GET_DRIVERS:
      return {
        ...state,
        drivers: action.payload.data,
        error: true,
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
        waitPage: false,
      };
    case ENABLED_WAIT_PAGE:
      return {
        ...state,
        waitPage: true,
      };
    default:
      return { ...state };
  }
};

export default reducer;
