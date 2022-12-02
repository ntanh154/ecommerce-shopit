import axios from "../axios";

import {
  NEW_CATRGORY_REQUEST,
  NEW_CATRGORY_SUCCESS,
  NEW_CATRGORY_FAIL,
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  CLEAR_ERRORS,
} from "../constants/categoryConstants";

export const newCategory = (formData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CATRGORY_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let data = {};
    await axios
      .post(`/api/v1/admin/genres/addgenre`, formData, config)
      .then(res => data = res)

    dispatch({
      type: NEW_CATRGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CATRGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getCategory = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORY_REQUEST });

    let data = {};
    await axios
      .get("/api/v1/genres")
      .then(res => data = res)

    console.log(data)
    dispatch({
      type: ALL_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORY_FAIL,
      payload: error,
    });
  }
};

// Delete CATEGORY (Admin)
export const dltCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    let data = {}
    await axios
      .delete(`/api/v1/movies/${id}`)
      .then(res => data = res)

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
