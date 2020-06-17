import { HelpType } from './type';

export class HelpCategory {
    id: number;
    code: string;
    name: string;
    image: string;
    checked: boolean;
    idHelpType: number;

    type: HelpType;
    parent: HelpCategory;
    children: HelpCategory[];
}
