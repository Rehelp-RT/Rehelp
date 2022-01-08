import { User } from './';
import { Help } from './help';
import { Post } from './post';

export class Comment {
    id: number;
    idPost: number;
    idHelp: number;
    idCreator: number;
    message: string;
    createdAt: Date;
    updatedAt: Date;

    post: Post;
    creator: User;
    help: Help;
}