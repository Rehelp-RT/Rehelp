import { Help } from './';
import { HelpResponse } from './response';
import { HelpCategory } from './category';

export class User {
    id: number;

    // data
    avatar: string;
    birthdate: Date;
    city: string;
    country: string;
    email: string;
    firstname: string;
    lastname: string;
    latitude: number;
    longitude: number;

    // meta
    likehelps: number;
    password: string;
    username: string;
    token: string;

    // virtual
    helps: Help[];
    responses: HelpResponse[];
    categories: HelpCategory[];

}
