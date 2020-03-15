import { Help, User } from './';

export class Notification {
    id: number;
    message: string;
    checked: boolean;
    idHelp: number;
    idUser: number;

    createdAt: Date;
    updatedAt: Date;

    help: Help;
    user: User;
}
