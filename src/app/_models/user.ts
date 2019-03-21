export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    tokenType: string;
    accessToken: string;                       
    errorMessage: string;
    role: string[];
}