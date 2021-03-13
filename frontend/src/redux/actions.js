import * as actions from '../redux/actionTypes';

export const loggedIn = description => ({
    type: actions.userConstants.LOGIN_SUCCESS,
    payload: {
        description
    }
});
