import { User } from './';

export class HelpResponse {
    id: number;
    accepted: boolean;
    completed: boolean;
    responder: User;
}
