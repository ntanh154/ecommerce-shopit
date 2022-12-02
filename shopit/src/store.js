import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux'
import {
    persistStore,
    persistReducer
} from 'redux-persist';
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    productReducer,
    productsReducer,
    productReviewsReducer,
    reviewReducer,
    productDetailsReducer,
    newReviewReducer,
} from "./reducers/productReducers";
import {
    authReducer,
    allUsersReducer,
    userReducer,
} from "./reducers/userReducers";
import { cartReducer } from './reducers/cartReducers'
import {
    allOrdersReducer,
    orderReducer,
    newOrderReducer, myOrdersReducer
} from "./reducers/orderReducers";

import {
    newCategoryReducer,
    categoryReducer,
    dltCategoryReducer,
} from "./reducers/categoryReducer";

const persistCommonConfig = {
    storage: storage
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
};

const productPersistConfig = {
    ...persistCommonConfig,
    key: 'product',
};
const cartPersistConfig = {
    ...persistCommonConfig,
    key: 'cart',
}
const reducer = combineReducers({
    products: persistReducer(productPersistConfig, productsReducer),
    product: productReducer,
    auth: persistReducer(userPersistConfig, authReducer),
    allUsers: allUsersReducer,
    allOrders: allOrdersReducer,
    category: categoryReducer,
    productDetails: productDetailsReducer,
    cart: persistReducer(cartPersistConfig, cartReducer),
    newOrder: newOrderReducer,
    newCategory: newCategoryReducer,
    dltCategory: dltCategoryReducer,
    order: orderReducer,
    user: userReducer,
    myOrders: myOrdersReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    newReview: newReviewReducer,
});



let initialState = {
};

const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)))
export const persistor = persistStore(store);

export default store;