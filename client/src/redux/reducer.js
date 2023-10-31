/* eslint-disable no-case-declarations */
import {
  GET_DRIVERS,
  ERROR_GET_DRIVERS,
  CLEAN_DRIVERS,
  GET_SINGLE_DRIVER,
  DISABLED_PAGE_BUTTONS,
} from "./action_types";

const initialState = {
  allDrivers: [],
  drivers: [],
  singleDriver: [],
  infoAPI: [],
  disabledButton: true,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        drivers: action.payload.data,
        infoAPI: action.payload.information,
        disabledButton: false,
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
        singleDriver: action.payload[0],
      };
    case DISABLED_PAGE_BUTTONS:
      return {
        ...state,
        disabledButton: true,
      };
    default:
      return { ...state };
  }
};

export default reducer;
