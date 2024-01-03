import {
  UPDATE_USER_NAME,
  SHOW_LOGIN_POPUP,
  SHOW_MAGAZINE_LIST,
  SHOW_MY_SUBSCRIPTION,
} from "../constant/appConstant";

export const initialState = {
  showSubscription: false,
  username: "",
  showLogIn: false,
  userId: 0,
};
// @ts-expect-error
export const magazineReducer = (state, action) => {
  switch (action.type) {
    case SHOW_MY_SUBSCRIPTION:
      return {
        ...state,
        showSubScription: true,
      };
    case SHOW_MAGAZINE_LIST:
      return {
        ...state,
        showSubScription: false,
      };
    case UPDATE_USER_NAME:
      return {
        ...state,
        username: action?.payload?.username,
        userId: action?.payload?.userId,
      };
    case SHOW_LOGIN_POPUP:
      return {
        ...state,
        showLogIn: action?.payload?.showLogIn,
      };
    default:
      return state;
  }
};
