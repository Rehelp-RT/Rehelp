import { User, Help } from '.';

export class Feedback {
    id: number;
    reviewer: User;
    reviewed: User;
    idReviewer: number;
    idReviewed: number;
    idHelp: number;
    help: Help;
    message: string;
    createdAt: Date;
    rating; number;
}
