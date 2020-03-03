import { User, HelpResponse } from '.';

export class Feedback {
    id: number;
    idResponse: number;
    messageCreator: string;
    messageResponder: string;
    createdAt: Date;
    updatedAt: Date;
    ratingCreator: number;
    ratingResponder: number;

    response: HelpResponse;
}
