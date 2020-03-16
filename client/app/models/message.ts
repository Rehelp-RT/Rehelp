import { HelpResponse, User } from './';

export class Message {
    id: number;
    idResponse: number;
    idAuthor: number;
    body: string;
    createdAt: Date;
    updatedAt: Date;

    response: HelpResponse;
    author: User;
}
