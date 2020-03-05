import { Help, User } from './';

export class HelpResponse {
    id: number;
    help: Help;
    responder: User;
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
}
