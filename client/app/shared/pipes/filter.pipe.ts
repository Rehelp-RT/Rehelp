import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    standalone: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string) {
    if (value.length === 0 || filterString === '') {
      return value;
    }

    const posts = []
    for(const i of value) {
      if (i.title === filterString) {
        posts.push(i);
      }
    }
    return posts;
  }

}
