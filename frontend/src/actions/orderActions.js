import axios from "axios"
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, CART_CLEAR_ITEMS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstants";

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
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU4OTQyODE1LCJpYXQiOjE2NTg5NDI1MTUsImp0aSI6ImY1NDU3NTQ1MzE3ODQxMTM4NTk5MTcxYTRmNjQ1Nzk5IiwidXNlcl9pZCI6MTEsInVzZXJuYW1lIjoiRGF2aWQgTm9ydGgifQ.7K7QaubU7DvcL7fh7jE4bNadQPh81VEneHZ0--QiK44`
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