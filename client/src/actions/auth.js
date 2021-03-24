import { AUTH } from "../constants/actionTypes";
import * as api from '../api/index.js';

export const login = (formData, history, config) => async (dispatch) => {
    try {
      const { data } = await api.login(formData);
      dispatch({ type: AUTH, data });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
};

export const register = (formData, history) => async(dispatch) => {
    try {
        const { data } = await api.register(formData);
        
        console.log(data)
        dispatch({type: AUTH, data})
        history.push("/dashboard");
    } catch (error) {
        console.log(error)
    }
}
