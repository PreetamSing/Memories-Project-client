import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
    try {
        // Login the user

        const { data } = await api.signIn(formData);

        if (data?.message === "First Time Google Sign In") {
            history.push('/memories/auth/googlesignin');
            return;
        }

        dispatch({ type: AUTH, data });

        history.push('/memories');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        // Signup the user

        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        history.push('/memories');
    } catch (error) {
        console.log(error);
    }
}