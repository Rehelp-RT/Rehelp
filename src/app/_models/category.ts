export class HelpCategory {
    id: number;
    code: string;
    name: string;
    parent: HelpCategory;
    children: HelpCategory[];
}
