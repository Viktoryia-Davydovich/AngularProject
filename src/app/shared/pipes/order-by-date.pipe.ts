import { Pipe, PipeTransform } from "@angular/core";
import { Course } from "src/app/models/Course";

@Pipe({
  name: "orderByDate"
})
export class OrderByDatePipe implements PipeTransform {
  transform(items: Course[]): any[] {
    return items.sort(function(a, b) {
      return b.creationDate.getTime() - a.creationDate.getTime();
    });
  }
}
