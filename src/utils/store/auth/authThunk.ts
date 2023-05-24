import { createAsyncThunk } from "@reduxjs/toolkit";
import { postLoginUser } from "../../api";
import { UserCredentialsParams } from "../../types";

export const userLoginThunk = createAsyncThunk('users/login',(creds:UserCredentialsParams) => {
    return postLoginUser(creds);
})