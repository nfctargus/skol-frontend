export type User = {
    id: string;
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