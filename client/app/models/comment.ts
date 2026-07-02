import { User } from './';
import { Help } from './help';
import { ForumPost } from './forumPost';

export class Comment {
    id: number;
    idPost?: number;
    idHelp?: number;
    idBachecaPost?: number;
    idCreator: number;
    message: string;
    createdAt: Date;
    updatedAt: Date;

    author: User;
}