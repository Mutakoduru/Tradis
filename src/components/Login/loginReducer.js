
const defaultState = {
    loginSuccess : '',
    loginError: ''
};

const login = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            return {
                ...state,
                loginError : action.body
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loginSuccess : action.body
            };
        default:
            return state;
    }
};

export default login;