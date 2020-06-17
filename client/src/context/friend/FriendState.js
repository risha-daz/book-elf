import React, { useReducer } from "react";
import axios from "axios";
import FriendContext from "./friendContext";
import friendReducer from "./friendReducer";

import {
  SEARCH_FRIEND,
  GET_REQUESTS_FROM,
  GET_REQUESTS_TO,
  NEW_REQUEST,
  DELETE_REQUEST,
  CLEAR_SEARCH_USER,
  SOCIAL_ERROR,
} from "../types";

const FriendState = (props) => {
  const initialState = {
    requeststo: null,
    requestsfrom: null,
    searchuser: null,
    errors: null,
  };
  const [state, dispatch] = useReducer(friendReducer, initialState);

  //Search user
  const searchUser = async (searchparams) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      console.log(searchparams);
      const res = await axios.post("/api/social/find", searchparams, config);
      dispatch({ type: SEARCH_FRIEND, payload: res.data });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({ type: SOCIAL_ERROR, payload: err.response.data.msg });
    }
  };

  //Clear search user
  const clearSearchUser = () => {
    dispatch({ type: CLEAR_SEARCH_USER });
  };

  //Get send request
  const getRequestsFrom = async () => {
    try {
      const res = await axios.get("/api/social/requests/from");
      dispatch({ type: GET_REQUESTS_FROM, payload: res.data });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({ type: SOCIAL_ERROR, payload: err.response.data.msg });
    }
  };
  //get recived requests
  const getRequestsTo = async () => {
    try {
      const res = await axios.get("/api/social/requests/to");
      dispatch({ type: GET_REQUESTS_TO, payload: res.data });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({ type: SOCIAL_ERROR, payload: err.response.data.msg });
    }
  };
  //make new request
  const newRequest = async (to) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/social/requests", { to }, config);
      dispatch({ type: NEW_REQUEST, payload: res.data });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({ type: SOCIAL_ERROR, payload: err.response.data.msg });
    }
  };
  //delete request
  const deleteRequest = async (id) => {
    try {
      const res = await axios.post(`/api/social/requests/${id}`);
      dispatch({ type: DELETE_REQUEST, payload: id });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({ type: SOCIAL_ERROR, payload: err.response.data.msg });
    }
  };

  return (
    <FriendContext.Provider
      value={{
        requestsfrom: state.requestsfrom,
        requeststo: state.requeststo,
        searchuser: state.searchuser,
        errors: state.errors,
        getRequestsFrom,
        getRequestsTo,
        searchUser,
        clearSearchUser,
        newRequest,
        deleteRequest,
      }}
    >
      {props.children}
    </FriendContext.Provider>
  );
};

export default FriendState;
