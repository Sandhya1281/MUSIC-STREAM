import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    const lowerSearch = searchText.toLowerCase();
    return items.filter(item => {
      return (item.title?.toLowerCase().includes(lowerSearch) ||
              item.artistName?.toLowerCase().includes(lowerSearch) ||
              item.album?.toLowerCase().includes(lowerSearch) ||
              item.genre?.toLowerCase().includes(lowerSearch));
    });
  }
}
