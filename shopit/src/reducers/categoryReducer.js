import {
  NEW_CATRGORY_REQUEST,
  NEW_CATRGORY_SUCCESS,
  NEW_CATRGORY_RESET,
  NEW_CATRGORY_FAIL,
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_RESET,
  CLEAR_ERRORS,
} from "../constants/categoryConstants";

const initialState = {
  category: [],
  loading: false
}
export const newCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_CATRGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_CATRGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        category: action.payload.category,
      };

    case NEW_CATRGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_CATRGORY_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_CATEGORY_REQUEST:
      console.log("2")
      return {
        loading: true,
        category: [],
      };

    case ALL_CATEGORY_SUCCESS:
      console.log("1")
      return {
        loading: false,
        category: action.payload.category,
      };

    case ALL_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const dltCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_CATEGORY_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
