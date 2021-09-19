import { LANG_CHANGE, GET_DATA, SET_DATA, SET_USER } from '../action-types';
import { store } from "../../redux";

export const langChange = lang => {
    store.dispatch({ type: LANG_CHANGE, lang: lang })
}