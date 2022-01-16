import { TradeTypes } from './trade';
import { Help, Message, User } from './';
export class BachecaPost {
    id: number;
    
    completed: boolean;
    idHelp: number;
    idResponder: number;

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
    creator: User;
}
