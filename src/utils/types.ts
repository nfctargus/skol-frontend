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