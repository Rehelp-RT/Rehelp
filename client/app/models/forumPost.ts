
import { User } from ".";
import { HelpCategory } from "./category";


export class ForumPost {
    id: number;
    idCategory: number;
    idCreator: number;
    image: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;

    creator: User;
    category: HelpCategory;
}