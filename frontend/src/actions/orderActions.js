import  axios  from "axios"
import { ORDER_CREATE_FAIL,ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS ,CART_CLEAR_ITEMS} from "../constants/orderConstants";

export const createOrder=(order)=>async(dispatch,getState)=>{
    try{
        const {userLogin:{userInfo}} =getState();
        dispatch({type:ORDER_CREATE_REQUEST})
        console.warn(userInfo.token)
        const config={
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${userInfo.token}`
            }
        }
        console.log(order);
        const {data}=await axios.post(`/api/orders/add/`,order,config)
        console.log(order);
        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data
        })
        dispatch({
            type:CART_CLEAR_ITEMS,
            payload:data
        })
        localStorage.removeItem('cartItems')
    }
    catch(error)
    {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:error.response && error.response.data.detail?error.response.data.detail:error.message
        })
    }
}