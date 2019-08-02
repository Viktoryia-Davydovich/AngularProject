import { Directive, Input, ElementRef } from "@angular/core";

@Directive({
  selector: "[appBoxShadow]"
})
export class BoxShadowDirective {
  @Input() courseDate: Date;

  constructor(private el: ElementRef) {
    const today: Date = new Date();
    if (
      this.courseDate < today &&
      this.courseDate >= new Date(today.setDate(today.getDate() - 14))
    ) {
      el.nativeElement.style.color = "green";
    } else if (this.courseDate > today) {
      el.nativeElement.style.color = "blue";
    }
  }
}
