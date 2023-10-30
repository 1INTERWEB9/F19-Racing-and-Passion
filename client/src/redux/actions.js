import {
  GET_DRIVERS,
  ERROR_GET_DRIVERS,
  CLEAN_DRIVERS,
  GET_SINGLE_DRIVER,
} from "./action_types";
import axios from "axios";

export const GetDrivers = (pageAPI, condition) => {
  return (dispatch) => {
    axios(`http://localhost:3001/drivers?page=${pageAPI}${condition}`)
      .then(({ data }) => {
        return dispatch({ type: GET_DRIVERS, payload: data });
      })
      .catch(() => {
        return dispatch({
          type: ERROR_GET_DRIVERS,
          payload: { results: [], info: [] },
        });
      });
  };
};

export const CleanCharacters = () => {
  return { type: CLEAN_DRIVERS };
};

export const GetSingleCharacter = (id) => {
  return (dispatch) => {
    axios(`http://localhost:3001/drivers/${id}`)
      .then(({ data }) => {
        return dispatch({ type: GET_SINGLE_DRIVER, payload: data });
      })
      .catch(() => {
        return dispatch({
          type: ERROR_GET_DRIVERS,
          payload: { results: [], info: [] },
        });
      });
  };
};
