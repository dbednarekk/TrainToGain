import {createSlice} from '@reduxjs/toolkit'


export const UserSlice = createSlice({
    name:"UserSlice",
    initialState:{
        login: '',
        token: ''
    },
    reducers:{
        setLoginSlice: (state, action) =>{
            state.login = action.payload.login
            state.token = action.payload.token
        },
        setLogoutSlice: (state) =>{
            state.login = ''
            state.token =''
        }
    }
})

export const {setLoginSlice, setLogoutSlice} = UserSlice.actions
export const selectLogin = (state) => state.userSlices.login
export const selectToken = (state) => state.userSlices.token
export default UserSlice.reducer