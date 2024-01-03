export const initialState = {
  showSubscription: false,
  username: "",
  showLogIn: false,
};
// @ts-expect-error
export const magazineReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_MY_SUBSCRIPTION":
      return {
        ...state,
        showSubScription: true,
      };
    case "SHOW_MAGAZINE_LIST":
      return {
        ...state,
        showSubScription: false,
      };
    case "UPDATE_USER_NAME":
      return {
        ...state,
        username: action?.payload?.username,
      };
    case "SHOW_LOGIN_POPUP":
      return {
        ...state,
        showLogIn: action?.payload?.showLogIn,
      };
    default:
      return state;
  }
};
