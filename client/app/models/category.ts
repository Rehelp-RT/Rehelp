export class HelpCategory {
    id: number;
    code: string;
    name: string;
    iamge: string;
    parent: HelpCategory;
    children: HelpCategory[];
    checked: boolean;
}
