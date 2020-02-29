import { User } from '.';

export class Feedback {
    id: number;
    responder: User;
    idReviewer: number;
    idReviewed: number;
    message: string;
    createdAt: Date;
}
