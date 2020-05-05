export class HelpCategory {
    id: number;
    code: string;
    name: string;
    image: string;
    parent: HelpCategory;
    children: HelpCategory[];
    checked: boolean;
}
