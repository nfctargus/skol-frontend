import axios, { AxiosRequestConfig } from 'axios';
import { CreateUserParams, User, UserCredentialsParams } from './types';

const API_URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({ baseURL: API_URL });
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: CreateUserParams) => axiosClient.post<User>(`/auth/register`, data, config);

export const postLoginUser = (credentials: UserCredentialsParams) => axiosClient.post(`/auth/login`, credentials, config);

export const getAuthUser = () => axiosClient.get<User>(`/auth/status`, config);