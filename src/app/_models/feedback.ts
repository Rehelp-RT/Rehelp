import { User, HelpResponse } from '.';

export class Feedback {
    id: number;
    idResponse: number;
    messageCreator: string;
    messageResponder: string;
    createdAt: Date;
    updatedAt: Date;
    rating: number;

    response: HelpResponse;
}
