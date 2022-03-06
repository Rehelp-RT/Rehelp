import { HelpCategory, HelpResponse, HelpType, User } from './';
import { Association } from './association';

export class Help {
    id: number;
    description: string;
    image: string;
    idCategory: number;
    idType: number;
    idCreator: number;
    createdAt: Date;
    updatedAt: Date;
    latitude: number;
    lhToDonate: number;
    longitude: number;
    address: string;
    likehelps: number;
    idDonateTo: number;

    // IMH
    halfhourValidity: number;
    dateEndValidity: Date;

    accepted: boolean;
    reviewed: boolean;
    completed: boolean;
    posted: boolean;

    isOffer: boolean;

    type: HelpType;
    creator: User;
    category: HelpCategory;
    responses: HelpResponse[];
    association: Association;
}
