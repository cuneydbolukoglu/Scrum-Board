import { GET_DATA, SET_DATA, SET_USER } from '../action-types';
import { combineReducers } from "redux";

const dataReducer = (state = "data", action) => {
  switch (action.type) {
    case GET_DATA:
      return action.data;

    default:
      return state;
  }
}

const rootReducer = combineReducers({ dataReducer });

export default rootReducer;