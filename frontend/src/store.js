import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers,productDetailsReducers } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfileRefucer} from './reducers/userReducers'
import { orderCreateReducer ,orderDetailReducer,orderPayReducer,orderListReducer} from './reducers/orderReducers'
const reducer=combineReducers({
    productList:productListReducers,
    productDetails:productDetailsReducers,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileRefucer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListReducer,
})
const cartItemsFromStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[] //these informations are pulled when the webpage is first loaded
const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const shippingAddressFromStorage=localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{}
const initialState={
    cart:{cartItems:cartItemsFromStorage,shippingAddress:shippingAddressFromStorage},
    userLogin:{userInfo:userInfoFromStorage}
}
const middleware=[thunk]
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store