import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../../api/authApi";
import { setToken, removeToken } from "../../utils/token";

export const login = createAsyncThunk(
"auth/login",
async (data:any,{rejectWithValue})=>{
try{
const res=await loginApi(data);
setToken(res.token);
return res.user;
}catch(err:any){
return rejectWithValue(err.message);
}
}
);

export const register = createAsyncThunk(
"auth/register",
async(formData:FormData,{rejectWithValue})=>{
try{
await registerApi(formData);
return true;
}catch(err:any){
return rejectWithValue(err.message);
}
}
);

const authSlice=createSlice({

name:"auth",

initialState:{
user:null as any,
loading:false,
error:""
},

reducers:{
logout:(state)=>{
state.user=null;
removeToken();
}
},

extraReducers:(builder)=>{

builder.addCase(login.pending,(state)=>{
state.loading=true;
state.error="";
});

builder.addCase(login.fulfilled,(state,action)=>{
state.loading=false;
state.user=action.payload;
});

builder.addCase(login.rejected,(state,action:any)=>{
state.loading=false;
state.error=action.payload;
});

builder.addCase(register.pending,(state)=>{
state.loading=true;
state.error="";
});

builder.addCase(register.fulfilled,(state)=>{
state.loading=false;
});

builder.addCase(register.rejected,(state,action:any)=>{
state.loading=false;
state.error=action.payload;
});

}

});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
