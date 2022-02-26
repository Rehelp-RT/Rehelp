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
    description: string;
    email: string;
    firstname: string;
    lastname: string;
    latitude: number;
    longitude: number;
    phoneNumber: string;
    donator: boolean;
    cf: string;

    responsesReviewsCount: number;
    responsesReviewsSum: number;
    helpsReviewsCount: number;
    helpsReviewsSum: number;

    // meta
    likehelps: number;
    password: string;
    token: string;
    loginLocal: boolean;
    loginFacebook: boolean;
    loginGoogle: boolean;
    idFacebook: string;
    idGoogle: string;
    resetPasswordToken: string;
    resetPasswordExpire: Date;

    // virtual
    helps: Help[];
    responses: HelpResponse[];
    categories: HelpCategory[];

}
