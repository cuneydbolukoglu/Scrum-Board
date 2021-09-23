import { LANG_CHANGE, GET_DATA, SET_DATA, SET_USER } from '../action-types';
import { combineReducers } from "redux";

const langState = document.documentElement.lang ? document.documentElement.lang : "en"

const langChangeReducer = (state = langState, action) => {
  switch (action.type) {
    case LANG_CHANGE:
      localStorage.setItem("i18nextLng", action.lang);
      return action.lang;

    default:
      return state;
  }
}

const rootReducer = combineReducers({ langChangeReducer });

export default rootReducer;