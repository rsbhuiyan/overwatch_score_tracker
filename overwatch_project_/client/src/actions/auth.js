import {AUTH} from '../constants/actionTypes'
import * as api from '../api';

//signing in
export const signin = (formData, navigate) => async (dispatch) => {
    try {
      //log in user
      const {data} = await api.signIn(formData);
      dispatch({type: AUTH, data});

      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
};

//signing out
export const signup = (formData, navigate) => async (dispatch) => {
    try {
      //sign up user
      const {data} = await api.signUp(formData);
      dispatch({type: AUTH, data});

      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
};