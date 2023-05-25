import axios, { AxiosRequestConfig } from 'axios';
import { CreateUserParams, Friend, User, UserCredentialsParams } from './types';

const API_URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({ baseURL: API_URL });
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: CreateUserParams) => axiosClient.post<User>(`/auth/register`, data, config);

export const postLoginUser = (credentials: UserCredentialsParams) => axiosClient.post(`/auth/login`, credentials, config);

export const getAuthUser = () => axiosClient.get<User>(`/auth/status`, config);

export const getFriends = () => axiosClient.get<Friend[]>(`/friends`,config);

export const addFriend = (id:number) => axiosClient.post<Friend>(`/friends/${id}`,config);

export const searchUsers = (query: string) => axiosClient.get<User[]>(`/users/search?query=${query}`, config);