import * as types from './types';
import {
  PRODUCT_API_GATEWAY,
  CATEGORY_API_GATEWAY,
  VENDOR_API_GATEWAY
} from './microservices';
import axios from 'axios';
import isEmpty from '../validation/is-empty';

// Get Product List
export const getProducts = index => dispatch => {
  // Default the index to 0 if not given.
  index = index == null ? 0 : index;

  // getVendorBatch and getCategoryBatch set loading: true
  // if either data is not loaded yet.
  // if we set loading here, it will refresh the render too many times
  // which results in losing the scroll wheel position...
  //dispatch(setProductLoading());
  axios
    .get(PRODUCT_API_GATEWAY + `/get/${index}/default`)
    .then(res => {
      dispatch({
        type: types.GET_PRODUCTS,
        payload: res.data
      });

      if (!isEmpty(res.data[0])) {
        if (!isEmpty(res.data[0].productId)) {
          let vendorIdArray = '';
          res.data
            .filter(prod => prod.vendorId !== 0)
            .map(
              prod =>
                vendorIdArray === ''
                  ? (vendorIdArray = prod.vendorId)
                  : (vendorIdArray = vendorIdArray + ',' + prod.vendorId)
            );
          dispatch(getVendorBatch(vendorIdArray));

          let categoryIdArray = '';
          res.data
            .filter(prod => prod.categoryId !== 0)
            .map(
              prod =>
                categoryIdArray === ''
                  ? (categoryIdArray = prod.categoryId)
                  : (categoryIdArray = categoryIdArray + ',' + prod.categoryId)
            );
          dispatch(getCategoryBatch(categoryIdArray));
        }
      }
    })
    .catch(err => {
      dispatch(setProductUpdated());
      // For development purposes. The micro-services take time to initialise.
      // This will keep requesting data if it gets a 500 or 403 error...
      // Should be removed once we actually implement a feature to error or retry x times.
      if (index === 0) dispatch(getProducts(index));

      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get Product with Imgs
export const getProductWithImgs = productId => dispatch => {
  dispatch(setProductLoading());
  axios
    .get(PRODUCT_API_GATEWAY + `/getDetails/${productId}`)
    .then(res => {
      dispatch({
        type: types.GET_PRODUCT,
        payload: res.data
      });
      dispatch(setProductUpdated());
    })
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setProductAdding = () => {
  return {
    type: types.PRODUCT_ADDING
  };
};

export const addProduct = newProd => dispatch => {
  // again, also here...
  // getVendorBatch and getCategoryBatch handle the loading state variable
  // if we call it too early, due to state changes between other methods...
  // the page reloads and shows the "spinning wheel" which causes loss in scroll position
  //dispatch(setProductLoading());
  axios
    .put(PRODUCT_API_GATEWAY + '/add', newProd)
    .then(res => {
      dispatch({
        type: types.PRODUCT_ADDING,
        payload: res.data
      });

      dispatch(getVendorBatch(res.data.vendorId));
      dispatch(getCategoryBatch(res.data.categoryId));
    })
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Clear Products
export const clearCurrentProducts = () => {
  return {
    type: types.CLEAR_CURRENT_PRODUCTS
  };
};

// Reload Products
export const reloadProducts = () => dispatch => {
  dispatch(clearCurrentProducts());
  dispatch(getProducts());
};

// Delete Product
export const deleteProduct = id => dispatch => {
  dispatch(setProductUpdateOnce());
  axios
    .delete(PRODUCT_API_GATEWAY + `/delete/${id}`)
    .then(res =>
      dispatch({
        type: types.PRODUCTS_DELETING,
        payload: id
      })
    )
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Block/unlock Product
export const toggleBlockProduct = product => dispatch => {
  dispatch(setProductUpdateOnce());
  axios
    .post(PRODUCT_API_GATEWAY + `/setBlock/${product.productId}`, product)
    .then(res =>
      dispatch({
        type: types.PRODUCTS_TOGGLEBLOCK,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Edit Product
export const editProduct = newInfo => dispatch => {
  dispatch(setProductEditing());
  axios
    .post(PRODUCT_API_GATEWAY + `/edit/${newInfo.productId}`, newInfo)
    .then(res =>
      dispatch({
        type: types.PRODUCT_EDITED,
        payload: newInfo
      })
    )
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Product Editing
export const setProductEditing = () => {
  return {
    type: types.PRODUCT_EDITING
  };
};

// Product Loading
export const setProductLoading = () => {
  return {
    type: types.PRODUCTS_LOADING
  };
};

export const setProductLoaded = () => {
  return {
    type: types.PRODUCTS_LOADED
  };
};

// Product update
export const setProductUpdateOnce = () => {
  return {
    type: types.PRODUCTS_UPDATING
  };
};

// Product update
export const setProductUpdated = () => {
  return {
    type: types.PRODUCTS_UPDATED
  };
};

export const getVendorBatch = vendorIdArray => dispatch => {
  axios
    .get(VENDOR_API_GATEWAY + `/batchFetch/${vendorIdArray}`)
    .then(res => {
      dispatch({
        type: types.GET_PRODUCT_VENDOR,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getCategoryBatch = categoryIdArray => dispatch => {
  axios
    .get(CATEGORY_API_GATEWAY + `/batchFetch/${categoryIdArray}`)
    .then(res =>
      dispatch({
        type: types.GET_PRODUCT_CATEGORY,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Search Products
export const searchProducts = keyword => dispatch => {
  dispatch(clearCurrentProducts());
  //dispatch(setProductLoading());
  axios
    .get(PRODUCT_API_GATEWAY + `/search/${keyword}`)
    .then(res => {
      dispatch({
        type: types.GET_PRODUCTS,
        payload: res.data
      });
      console.log("DATA IS HERE! " + res.data);
      if (!isEmpty(res.data[0])) {
        if (!isEmpty(res.data[0].productId)) {
          let vendorIdArray = '';
          res.data
            .filter(prod => prod.vendorId !== 0)
            .map(
              prod =>
                vendorIdArray === ''
                  ? (vendorIdArray = prod.vendorId)
                  : (vendorIdArray = vendorIdArray + ',' + prod.vendorId)
            );
          dispatch(getVendorBatch(vendorIdArray));

          let categoryIdArray = '';
          res.data
            .filter(prod => prod.categoryId !== 0)
            .map(
              prod =>
                categoryIdArray === ''
                  ? (categoryIdArray = prod.categoryId)
                  : (categoryIdArray = categoryIdArray + ',' + prod.categoryId)
            );
          dispatch(getCategoryBatch(categoryIdArray));
        }
      }
    })
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Filter Products by Category
export const filterProductsByCategory = inputs => dispatch => {
  dispatch(clearCurrentProducts());
  dispatch(setProductLoading());
  axios
    .get(
      PRODUCT_API_GATEWAY +
        `/bycategory/${inputs.cur_id}/${inputs.index}/default`
    )
    .then(res => {
      dispatch({
        type: types.GET_PRODUCTS,
        payload: res.data
      });
      dispatch(setProductLoaded());
    })
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      });
    });
};
