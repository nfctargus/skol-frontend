export type User = {
    id:number;
    name:string;
    avatar:string;
    lastMessage:string;
    lastMessageSentAt:string;
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