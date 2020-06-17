import {
  SEARCH_FRIEND,
  GET_REQUESTS_FROM,
  GET_REQUESTS_TO,
  NEW_REQUEST,
  DELETE_REQUEST,
  SOCIAL_ERROR,
  CLEAR_SEARCH_USER,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SEARCH_FRIEND:
      return { ...state, searchuser: action.payload };
    case GET_REQUESTS_TO:
      return { ...state, requeststo: action.payload };
    case GET_REQUESTS_FROM:
      return { ...state, requestsfrom: action.payload };
    case NEW_REQUEST:
      return {
        ...state,
        requestsfrom: [action.payload, ...state.requestsfrom],
      };
    case DELETE_REQUEST:
      return {
        ...state,

        requestsfrom: state.requestsfrom.filter(
          (req) => req._id !== action.payload
        ),
      };
    case CLEAR_SEARCH_USER:
      return { ...state, searchuser: null };
    case SOCIAL_ERROR:
      return {
        ...state,
        requestsfrom: null,
        requeststo: null,
        searchuser: null,
        errors: action.payload,
      };
    default:
      return state;
  }
};
