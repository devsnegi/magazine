// @ts-expect-error
import { v1 as uuid } from "uuid";
// @ts-expect-error
export const magazineReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_MY_SUBSCRIPTION":
      console.log("cation:-", action);
      return [
        ...state,
        {
          title: action.payload.title,
          author: action.payload.author,
          id: uuid(),
        },
      ];
    case "REMOVE_BOOK":
      // @ts-expect-error
      return state.filter((book) => book.id !== action.id);
    default:
      return state;
  }
};
