import { TradeTypes } from './trade';
import { Help, Message, User } from '.';
export class Transaction {
    id: number;
    
    idHelp: number;
    idCreator: number;
    idResponder: number;

    help: Help;
    creator: User;
    responder: User;
    messages: Message[];
    trade: TradeTypes;
}
