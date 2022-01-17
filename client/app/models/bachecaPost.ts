import { TradeTypes } from './trade';
import { Help, Message, User } from './';
export class BachecaPost {
    id: number;
    
    idHelp: number;
    idResponder: number;
    idCreator: number;

    description: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    
    help: Help;
    responder: User;
    author: User;
}
