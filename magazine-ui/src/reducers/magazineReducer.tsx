export const initialState = {
  showSubscription: false,
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
    default:
      return state;
  }
};
