import {
  GET_PRODUCTS,
  CLEAR_PRODUCTS,
  STOP_PAGINATION,
  GET_CURRENT_PRODUCT,
  CLEAR_CURRENT_PRODUCT,
  ADD_NEW_REVIEW,
  ADD_NEW_COMMENT,
  GET_CATEGORIES,
  CLEAR_CATEGORIES,
  ADD_PRODUCT,
} from "../actions/types";

const initialState = {
  productCount: null,
  products: [],
  categories: [],
  currentProduct: null,
  paginationable: true,
};

const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...payload],
        productCount: payload.count,
        paginationable: true,
      };
    case CLEAR_PRODUCTS:
      return {
        ...state,
        products: [],
        productCount: null,
        paginationable: null,
      };
    case STOP_PAGINATION:
      return {
        ...state,
        paginationable: false,
      };
    case GET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: payload,
      };
    case CLEAR_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: null,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, ...payload],
      };

    case ADD_NEW_REVIEW:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          reviews: payload,
        },
      };

    case ADD_NEW_COMMENT:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          comments: payload,
        },
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: [...state.categories, ...payload],
      };
    case CLEAR_CATEGORIES:
      return {
        ...state,
        categories: [],
      };

    default:
      return state;
  }
};

export default productsReducer;
