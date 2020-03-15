import { Help, Message, User } from './';

export class HelpResponse {
    id: number;
    message: string;
    accepted: boolean;
    reviewed: boolean;
    completed: boolean;
    idHelp: number;
    idResponder: number;

    messageCreator: string;
    messageResponder: string;
    creatorReviewedAt: Date;
    responderReviewedAt: Date;
    ratingCreator: number;
    ratingResponder: number;

    help: Help;
    responder: User;
    messages: Message[];
}
