import { TradeTypes } from './trade';
import { Help, Message, User } from '.';
export class Transaction {
    idHelp: number;
    idCreator: number;
    idResponder: number;

    description: string;
    date: Date;
    likeHelp: number;
    isPositive: boolean;

    help: Help;
    creator: User;
    responder: User;
}
