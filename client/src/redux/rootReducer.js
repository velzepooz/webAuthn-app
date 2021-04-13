const initialState = {
  currentUser: null,
};

export const loginUser = userData => ({
  type: 'LOGIN_USER',
  payload: userData,
});

export const userLogOut = () => ({
  type: 'LOG_OUT',
});

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: { ...action.payload },
      };
    case 'LOG_OUT':
      return {
        ...initialState,
      }
    default:
      break;
  }

  return state;
};
