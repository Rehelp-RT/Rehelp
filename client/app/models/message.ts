import { Help, HelpResponse, User } from './';

export class Message {
    id: number;
    idHelp: number;
    idResponse: number;
    idAuthor: number;
    body: string;
    createdAt: Date;
    updatedAt: Date;

    help: Help;
    author: User;
}
