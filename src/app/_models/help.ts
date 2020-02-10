import { HelpCategory, HelpResponse, HelpType, User } from './';

export class Help {
    id: number;
    title: string;
    description: string;
    image: string;
    idCategory: number;
    idType: number;
    idCreator: number;
    HelpCategory: HelpCategory;
    HelpType: HelpType;
    User: User;
    responses: HelpResponse[];
    createdAt: Date;
    updatedAt: Date;
    latitude: number;
    longitude: number;
    address: string;
}
