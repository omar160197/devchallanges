import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { print } from "graphql";
import gql from 'graphql-tag';
import { useNavigate } from "react-router-dom";

let counter=0;

export const loginUser = createAsyncThunk(
  "post/loginUser",
  async (userData, thunkAPI) => {
      console.log(userData);
    const { rejectWithValue } = thunkAPI;
    counter+=1
    console.log(counter);
    const LOGIN_USER = gql`
      mutation LoginUser($loginUserInput: LoginInput) {
        loginUser(loginUserInput: $loginUserInput) {
          email
          password
          username
          bio
          phone
          token
        }
      }
    `;
 
    const res = await axios.post("http://localhost:5000/", {
      query: print(LOGIN_USER),
      variables: {
        loginUserInput: {
          email: userData.email,
          password: userData.password,
        },
      },
    });
    // console.log(res.data.data.loginUser);
    if(res.data.data.loginUser !== null){
        localStorage.setItem("user", JSON.stringify(res.data.data.loginUser));
        return res.data.data.loginUser
    }else{
        console.log(res.data.errors[0].message);
      return rejectWithValue(res.data.errors[0].message);
    }
  }
);



export const updateUser = createAsyncThunk(
    "update/updateUser",
    async (userData, thunkAPI) => {
        console.log(userData.values);
      const { rejectWithValue } = thunkAPI;

      const LOGIN_USER = gql`
      mutation UpdateUser($updateUserInput: UpdateInput) {
        updateUser(updateUserInput: $updateUserInput) {
          email
          username
          password
          phone
          bio
        }
      }
      `;
       

      const res = await axios.post("http://localhost:5000/", {
        query: print(LOGIN_USER),
        variables: {
            updateUserInput: {
            email: userData.email,
            password: userData.values.password,
            bio:userData.values.bio,
            phone:userData.values.phone,
            username:userData.values.username,

          },
        },
      });
      console.log(res);
      if(res.data.data.updateUser !== null){
          localStorage.setItem("user", JSON.stringify(res.data.data.updateUser));
          return res.data.data.updateUser
      }else{
          console.log(res.data.errors[0].message);
        return rejectWithValue(res.data.errors[0].message);
      }
    }
  );


//Logout
export const logout = createAsyncThunk(
    "post/logout",
    async (_, thunkAPI) => {
      
      const { rejectWithValue } = thunkAPI;
      try {
        localStorage.removeItem("user");
        // localStorage.removeItem('cart');
        // localStorage.removeItem("localFavourite");
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );



let user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isError: null,
    message:null,
    isSuccess:false
  };

export const graphqlUserSlice=createSlice({
name:"user",
initialState,
reducers:{
    reset: (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      },
},
extraReducers:{

    [loginUser.pending]: (state, action) => {
        console.log(action);
        state.isLoading = true;
        state.isError = null;
      },
      [loginUser.fulfilled]: (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      },
      [loginUser.rejected]: (state, action) => {
        console.log(action.payload);  
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      },
      [logout.fulfilled]: (state, action) => {
        console.log(action);
        state.user = null;
      },


      [updateUser.pending]: (state, action) => {
        console.log(action);
        state.isLoading = true;
        state.isError = null;
      },
      [updateUser.fulfilled]: (state, action) => {
        console.log(action.payload);  
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      },
      [updateUser.rejected]: (state, action) => {
        console.log(action.payload);  
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      },

}

});

export const { reset } = graphqlUserSlice.actions;
export default graphqlUserSlice.reducer;