import { GET_DATA, SET_DATA, SET_USER } from '../action-types';
import { store } from "../../redux";

export const dataChange = data => {
    store.dispatch({ type: GET_DATA, data: data })
}