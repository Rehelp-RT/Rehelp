import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterCategories',
    standalone: false
})
export class FilterCategoriesPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const res = value.filter(x => (x.id == args[0].id) ? x : null);
    if (res.length === 0 || res[0].children === undefined) {
      return [];
    } else {
      const cats = res[0].children;
      if (args[0].idChild === undefined) {
        return cats;
      } else {
        const res2 = cats.filter(x => (x.id == args[0].idChild) ? x : null);
        if (res2.length === 0 || res2[0].children === undefined) {
          return [];
        } else {
          return res2[0].children;
        }
      }
    }
  }

}
