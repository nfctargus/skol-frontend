import axios, { AxiosRequestConfig } from 'axios';
import { Chat, CreateChatParams, CreateGroupChatParams, CreateGroupMessageResponse, CreateMessageParams, CreatePrivateMessageResponse, CreateUserParams, DeleteFriendResponse, DeleteGroupMessagePayload, DeleteMessagePayload, DeleteMessageResponse, EditGroupChatMemberParams, EditGroupChatNameParams, EditGroupMessageResponse, EditMessagePayload, EditPrivateMessageResponse, Friend, GroupChat, GroupMessage, PrivateMessage, User, UserCredentialsParams, UserPresence } from './types';

const API_URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({ baseURL: API_URL });
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: CreateUserParams) => axiosClient.post<User>(`/auth/register`, data, config);

export const postLoginUser = (credentials: UserCredentialsParams) => axiosClient.post(`/auth/login`, credentials, config);

export const postLogoutUser = () => axiosClient.post('/auth/logout', {}, config);

export const getAuthUser = () => axiosClient.get<User>(`/auth/status`, config);

export const getFriends = () => axiosClient.get<Friend[]>(`/friends`,config);

export const addFriend = (email:string) => axiosClient.post<Friend>(`/friends`,{email},config);

export const deleteFriend = (id:number) => axiosClient.delete<DeleteFriendResponse>(`/friends/${id}`,config);

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

export const postNewUserProfile = (data:FormData) => axiosClient.post(`/users/profiles`,data,{...config, headers: {'Content-Type': 'multipart/form-data'} });

export const updateUserProfile = (data:FormData) => axiosClient.patch(`/users/profiles`,data,{...config, headers: {'Content-Type': 'multipart/form-data'} });

export const uploadGroupProfilePicture = (id:number,data:FormData) => axiosClient.post(`/groups/${id}/avatar`,data,{...config, headers: {'Content-Type': 'multipart/form-data'} });

export const updateGroupChatName = ({id,name}:EditGroupChatNameParams) => axiosClient.post<GroupChat>(`/groups/${id}/update`,{name},config);

export const deletePrivateMessage = ({chatId,messageId}:DeleteMessagePayload) => axiosClient.delete<DeleteMessageResponse>(`/chats/${chatId}/messages/${messageId}`,config);

export const deleteGroupMessage = ({groupId,messageId}:DeleteGroupMessagePayload) => axiosClient.delete<DeleteMessageResponse>(`/groups/${groupId}/messages/${messageId}`,config);

export const deleteGroupChatMember = ({groupId,userId}:EditGroupChatMemberParams) => axiosClient.post(`/groups/${groupId}/members/remove`,{userId},config);

export const addGroupChatMembers = ({groupId,users}:EditGroupChatMemberParams) => axiosClient.put(`/groups/${groupId}/members/add`,{users},config);

export const getUserPresence = (id:number) => axiosClient.get<User>(`/users/presence/${id}`,config);

export const getAllFriendsPresence = () => axiosClient.get<User[]>(`/users/presence`,config);

export const updateUserPresence = (presence:string) => axiosClient.post<User>(`/users/presence`,{presence},config);