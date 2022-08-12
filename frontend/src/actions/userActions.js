import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_RESET,

    USER_REGISTER_SUCCESS,
    USER_DETAILS_RESET
} from "../constants/userConstants"
import  axios  from "axios"

export const loginUser=(email,password)=>async(dispatch)=>{
    try{
        console.log(email);
        console.log(password);
        dispatch({type:USER_LOGIN_REQUEST})
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data}=await axios.post('/api/users/login/',
            {
              'username':email,
              'password':password
            },
            config
        )
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('user info',JSON.stringify(data))
    }
    catch(error)
    {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.detail?error.response.data.detail:error.message
        })
    }
}
export const getUserDetails=(id)=>async(dispatch,getState)=>{
    try{
        const {userLogin:{userInfo}} =getState();
        dispatch({type:USER_DETAILS_REQUEST})
        console.log(userInfo.token);
        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        
        const {data}=await axios.get(`/api/users/profile/`,config)
        console.log(data);
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })
    }
    catch(error)
    {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.detail?error.response.data.detail:error.message
        })
    }
}

export const register=(name,email,password)=>async(dispatch)=>{
    try{
        console.log(email);
        console.log(password);
        dispatch({type:USER_REGISTER_REQUEST})
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
       
        const {data}=await axios.post('/api/users/register/',
            {
              'name':name,
              'email':email,
              'password':password
            },
            config
        )
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })
    }
    catch(error)
    {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.detail?error.response.data.detail:error.message
        })
    }
}


export const updateUserProfile=(user)=>async(dispatch,getState)=>{
    try{
        const {userLogin:{userInfo}} =getState();
        dispatch({type:USER_UPDATE_PROFILE_REQUEST})
        console.warn(userInfo.token)
        const config={
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${userInfo.token}`
            }
        }
        
        const {data}=await axios.put(`/api/users/profile/update/`,user,config)
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload:data
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('user info',JSON.stringify(data))
    }
    catch(error)
    {
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload:error.response && error.response.data.detail?error.response.data.detail:error.message
        })
    }
}
export const logoutUser=()=>(dispatch)=>{
        dispatch({type:USER_LOGOUT})
        dispatch({type:USER_DETAILS_RESET})
        localStorage.removeItem();
    

}