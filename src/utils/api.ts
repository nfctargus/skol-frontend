import axios, { AxiosRequestConfig } from 'axios';
import { Chat, CreateChatParams, CreateGroupChatParams, CreateGroupMessageResponse, CreateMessageParams, CreatePrivateMessageResponse, CreateUserParams, EditGroupMessageResponse, EditMessagePayload, EditPrivateMessageResponse, Friend, GroupChat, GroupMessage, PrivateMessage, User, UserCredentialsParams } from './types';

const API_URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({ baseURL: API_URL });
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: CreateUserParams) => axiosClient.post<User>(`/auth/register`, data, config);

export const postLoginUser = (credentials: UserCredentialsParams) => axiosClient.post(`/auth/login`, credentials, config);

export const postLogoutUser = () => axiosClient.post('/auth/logout', {}, config);

export const getAuthUser = () => axiosClient.get<User>(`/auth/status`, config);

export const getFriends = () => axiosClient.get<Friend[]>(`/friends`,config);

export const addFriend = (email:string) => axiosClient.post<Friend>(`/friends`,{email},config);

export const deleteFriend = (id:number) => axiosClient.delete(`/friends/${id}`,config);

export const searchUsers = (query: string) => axiosClient.get<User[]>(`/users/search?query=${query}`, config);

export const getChats = () => axiosClient.get<Chat[]>(`/chats`,config);

export const postNewChat = (data:CreateChatParams) => axiosClient.post<Chat>(`/chats`,data,config)

export const findOrCreateChat = (email:string) => axiosClient.post<Chat>(`/chats/find`,{email},config);

export const getPrivateMessages = (id:number) => axiosClient.get<PrivateMessage[]>(`/chats/${id}/messages`,config)

export const postPrivateMessage = ({id,messageContent}:CreateMessageParams) => axiosClient.post<CreatePrivateMessageResponse>(`/chats/${id}/messages`,{messageContent},config);

export const editMessage = ({messageContent,chatId,messageId}: EditMessagePayload) => axiosClient.patch<EditPrivateMessageResponse>(`/chats/${chatId}/messages`,{messageId,messageContent},config);

export const getGroupChats = () => axiosClient.get<GroupChat[]>(`/groups`,config);

export const postNewGroupChat = (data:CreateGroupChatParams) => axiosClient.post<GroupChat>(`/groups`,data,config)

export const getGroupMessages = (id:number) => axiosClient.get<GroupMessage[]>(`/groups/${id}/messages`,config);

export const postGroupMessage = ({id,messageContent}:CreateMessageParams) => axiosClient.post<CreateGroupMessageResponse>(`/groups/${id}/messages`,{messageContent},config);

export const editGroupMessage = ({messageContent,chatId,messageId}: EditMessagePayload) => axiosClient.patch<EditGroupMessageResponse>(`/groups/${chatId}/messages`,{messageId,messageContent},config);