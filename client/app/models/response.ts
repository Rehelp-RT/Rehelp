import { TradeTypes } from './trade';
import { Help, Message, User } from './';

export class HelpResponse {
    id: number;
    message: string;
    accepted: boolean;
    reviewed: boolean;
    completed: boolean;
    idHelp: number;
    idResponder: number;
    idTradeType: number;

    messageCreator: string;
    messageResponder: string;
    imageReviewCreator: string;
    imageReviewResponder: string;
    creatorReviewedAt: Date;
    responderReviewedAt: Date;
    ratingCreator: number;
    ratingResponder: number;

    help: Help;
    responder: User;
    messages: Message[];
    trade: TradeTypes;
}
