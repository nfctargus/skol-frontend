export type User = {
    id: number;
	email: string;
    username:string;
	firstName: string;
	lastName: string;
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
export type Chat = {
    id:number;
    creator:User;
    recipient:User;
    messages:PrivateMessage[];
    createdAt:number;
    lastMessageSent:PrivateMessage;
    lastMessageSentAt:number;
}
export type CreateChatParams = {
    
}