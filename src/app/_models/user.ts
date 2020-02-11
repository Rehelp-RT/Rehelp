import { Help } from './';

export class User {
    id: number;
    username: string;
    password: string;
    avatar: string;
    email: string;
    firstname: string;
    lastname: string;
    birthdate: Date;
    token: string;
    likehelps: number;

    helps: Help[];
}
