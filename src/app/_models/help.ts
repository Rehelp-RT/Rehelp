import { HelpCategory, HelpType, User } from './';

export class Help {
    id: number;
    title: string;
    description: string;
    type: string;
    idCategory: number;
    idType: number;
    idCreator: number;
    HelpCategory: HelpCategory;
    HelpType: HelpType;
    User: User;
}
