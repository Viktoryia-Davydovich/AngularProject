import { Pipe, PipeTransform } from "@angular/core";
import { Course } from "src/app/models/course";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(items: Course[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.name.toLowerCase().includes(searchText);
    });
  }
}
