import { Help, User } from './';
import { Feedback } from './feedback';

export class HelpResponse {
    id: number;
    help: Help;
    responder: User;
    message: string;
    accepted: boolean;
    completed: boolean;
    idHelp: number;
    idResponder: number;

    feedback: Feedback;
}
