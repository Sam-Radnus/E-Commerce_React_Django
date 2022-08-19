import axios from "axios"
import { ORDER_CREATE_FAIL,
         ORDER_CREATE_REQUEST,
         ORDER_CREATE_SUCCESS, 
      
         CART_CLEAR_ITEMS, 

         ORDER_DETAILS_FAIL,
         ORDER_DETAILS_REQUEST,
         ORDER_DETAILS_SUCCESS,
         
         ORDER_PAY_REQUEST,
         ORDER_PAY_SUCCESS,
         ORDER_PAY_FAIL,
         ORDER_PAY_RESET,
         ORDER_LIST_MY_REQUEST,
         ORDER_LIST_MY_SUCCESS,
         ORDER_LIST_MY_FAIL,
         ORDER_LIST_MY_RESET,
    } from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState();
        dispatch({ type: ORDER_CREATE_REQUEST })
        console.warn(userInfo.token)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        console.log(order);
        const { data } = await axios.post(`/api/orders/add/`, order, config)
        console.log(order);
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })
        localStorage.removeItem('cartItems')
    }
    catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })
        const { userLogin: { userInfo } } = getState();
        console.log(1);

        console.log(userInfo);
        console.warn(userInfo.token)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        console.log(3);
        const { data } = await axios.get(`/api/orders/${id}/`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            loading:false,
            payload: data
        })
        console.log(4);
    }
    catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}
export const payOrder = (id,paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST })
        const { userLogin: { userInfo } } = getState();
        console.log(1);

        console.log(userInfo);
        console.warn(userInfo.token)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        console.log(3);
        const { data } = await axios.put(`/api/orders/${id}/pay`,paymentResult, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            loading:false,
            payload: data
        })
        console.log(4);
    }
    catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}
export const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_MY_REQUEST })
        const { userLogin: { userInfo } } = getState();
        console.log(1);

        console.log(userInfo);
        console.warn(userInfo.token)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        console.log(3);
        const { data } = await axios.get(`/api/orders/myorders/`, config)
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            loading:false,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}