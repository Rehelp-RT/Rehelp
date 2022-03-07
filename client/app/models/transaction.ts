import { TradeTypes } from './trade';
import { Help, Message, User } from '.';
import { Association } from './association';
export class Transaction {
    idHelp: number;
    idCreator: number;
    idResponder: number;
    idDonateTo: number;

    description: string;
    date: Date;
    likeHelp: number;
    lhToDonate: number;
    isPositive: boolean;

    help: Help;
    creator: User;
    responder: User;
    association: Association;
}
