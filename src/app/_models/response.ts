import { Help, User } from './';

export class HelpResponse {
    id: number;
    help: Help;
    responder: User;
    message: string;
    accepted: boolean;
    completed: boolean;
}
