import {createSlice} from '@reduxjs/toolkit'

const initialState={
    token:null,
    name:null,
    email:null,
    isAuthenticated:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state,action){
            state.token = action.payload.token
            state.email = action.payload.email
            state.name = action.payload.name
            state.isAuthenticated = true
        },
        clearuser(state,action){
            state.token = null
            state.email = null 
            state.name = null 
            state.isAuthenticated = false
        }
    }
})

export const {setUser,clearuser}=userSlice.actions;
export default userSlice.reducer