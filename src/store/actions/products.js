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
  REMOVE_PRODUCT,
  ADD_PRODUCT,
  CHANGE_PRODUCT,
  PREVIOUS_PAGE,
  NEXT_PAGE,
} from "./types";
import { showSpinner, hideSpinner, setAlert } from "./visual";
import axios from "axios";

export const refreshProducts = () => async (dispatch) => {
  dispatch(clearProducts());
  dispatch(fetchProducts());
};

export const clearProducts = () => (dispatch) => {
  dispatch({ type: CLEAR_PRODUCTS });
};

export const fetchProducts = () => async (dispatch) => {
  dispatch(showSpinner());
  try {
    const res = await axios.get("https://gameshop-g5.com/products/");
    dispatch({ type: GET_PRODUCTS, payload: res.data.results });
    dispatch({ type: PREVIOUS_PAGE, payload: res.data.previous });
    dispatch({ type: NEXT_PAGE, payload: res.data.next });
    dispatch(hideSpinner());
  } catch ({ response }) {
    dispatch(hideSpinner());
    dispatch(setAlert("Error", "error"));
  }
};

export const getProducts = (targetUrl) => async (dispatch) => {
  dispatch(showSpinner());
  try {
    const res = await axios.get(`https://gameshop-g5.com${targetUrl}`);
    res.data.length === 0
      ? dispatch({ type: STOP_PAGINATION })
      : dispatch({ type: GET_PRODUCTS, payload: res.data.results });

    dispatch({ type: PREVIOUS_PAGE, payload: res.data.previous });
    dispatch({ type: NEXT_PAGE, payload: res.data.next });
    dispatch(setAlert("Enjoy in shopping :)", "success"));
    dispatch(hideSpinner());
  } catch ({ response }) {
    dispatch(hideSpinner());
    // dispatch(setAlert(response.data.message, "error"));
    dispatch(setAlert("Error", "error"));
  }
};

export const getCurrentProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`https://gameshop-g5.com/products/${id}`);

    dispatch({ type: GET_CURRENT_PRODUCT, payload: res.data });
  } catch ({ response }) {
    // dispatch(setAlert(response.data.message && response.data.message, "error"));
    dispatch(setAlert("Error", "error"));
  }
};

export const clearCurrentProduct = () => (dispatch) => {
  dispatch({ type: CLEAR_CURRENT_PRODUCT });
};

export const postNewComment = (formData, productId) => async (dispatch) => {
  try {
    const res = await axios.post(
      `https://gameshop-g5.com/products/${productId}/comments/`,
      formData, //? moze i na drugi nacin. Tako sto cu u funkciji handleSubmit: postNewComment({ content: comment }, currentProduct.id)
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    dispatch({ type: ADD_NEW_COMMENT, payload: res.data });
    dispatch(setAlert("Comment posted", "success"));
  } catch ({ response }) {
    dispatch(setAlert(response.data.message && response.data.message, "error"));
  }
};

export const removeProduct = (id) => async (dispatch) => {
  // dispatch(showSpinner());
  try {
    await axios.delete(`https://gameshop-g5.com/products/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    dispatch({ type: REMOVE_PRODUCT, payload: id });
    dispatch(setAlert("Removed product", "success"));
    // dispatch(hideSpinner());
  } catch ({ response }) {
    dispatch(hideSpinner());
    dispatch(setAlert("Product is not deleted. Try again!", "error"));
  }
};

export const addProduct = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `https://gameshop-g5.com/products/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: ADD_PRODUCT, payload: res.data });
    dispatch(setAlert("Product added", "success"));
  } catch ({ response }) {
    dispatch(setAlert("Not added!", "error"));
  }
};

export const changeProduct = (formData) => async (dispatch) => {
  try {
    await axios.patch(
      `https://gameshop-g5.com/products/${formData.id}/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    // dispatch({ type: CHANGE_PRODUCT, payload: res.data }); //! nije dodato
    dispatch(setAlert("Product changed", "success"));
  } catch ({ response }) {
    dispatch(setAlert(response.data.message && response.data.message, "error"));
    dispatch(setAlert("Product not changed", "error"));
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("https://gameshop-g5.com/categories/");
    dispatch({ type: GET_CATEGORIES, payload: res.data });
  } catch ({ response }) {
    dispatch(setAlert("Error", "error"));
  }
};

export const clearCategories = () => (dispatch) => {
  dispatch({ type: CLEAR_CATEGORIES });
};

// export const postNewReview = (formData, productId) => async (dispatch) => {
//   try {
//     const res = await axios.post(`/api/products/${productId}/review`, formData);
//     dispatch({ type: ADD_NEW_REVIEW, payload: res.data.reviews });
//     dispatch(setAlert("Review posted", "success"));
//   } catch ({ response }) {
//     dispatch(setAlert(response.data.message && response.data.message, "error"));
//   }
// };
