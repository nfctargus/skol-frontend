export type User = {
    id: number;
	email: string;
    username:string;
	firstName: string;
	lastName: string;
    avatar?:string;
}
export type CreateUserParams = {
	email: string;
	firstName: string;
	lastName: string;
    username:string;
	password: string;
};
export type UserCredentialsParams = {
	email: string;
	password: string;
};
export type Friend = {
    id: number;
    userOne: User;
    userTwo: User;
    createdAt: number;
};
export type PrivateMessage = {
    id:number;
    messageContent:string;
    createdAt:number;
    author:User;
    chat:Chat;
}
export type GroupMessage = {
    id:number;
    messageContent:string;
    createdAt:number;
    author:User;
    groupChat:GroupChat;
}
export type Chat = {
    id:number;
    creator:User;
    recipient:User;
    messages:PrivateMessage[];
    createdAt:number;
    lastMessageSent:PrivateMessage;
    lastMessageSentAt:number;
}
export type GroupChat = {
    id:number;
    name?:string;
    creator:User;
    members:User[];
    messages:GroupMessage[];
    createdAt:number;
    lastMessageSent:GroupMessage;
    lastMessageSentAt:number;
    avatar?:string;
}
export type CreateChatParams = {
    email:string;
    message?:string;
}
export type CreateGroupChatParams = {
    members:string[];
    message?:string;
    name?:string;
}
export type CreateMessageParams = {
    id:number;
    messageContent:string;
}
export type CreatePrivateMessageResponse = {
    message:PrivateMessage;
    chat:Chat;
}
export type CreateGroupMessageResponse = {
    message:GroupMessage;
    chat:GroupChat;
}
export type EditPrivateMessageResponse = {
    messageId:number;
    message:PrivateMessage;
}
export type EditGroupMessageResponse = {
    messageId:number;
    message:GroupMessage;
}
export type EditMessagePayload = {
    chatId:number;
    messageId:number;
    messageContent:string;
}
export type UserOnboardingParams = {
    avatar?:string;
}