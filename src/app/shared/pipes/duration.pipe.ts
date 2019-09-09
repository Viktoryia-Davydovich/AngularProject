import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "duration"
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    let hrs = ~~(value / 60);
    let mins = value % 60;
    return hrs ? `${hrs}h ${mins}min` : `${mins}min`;
  }
}
