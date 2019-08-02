import { Directive, Input, ElementRef } from "@angular/core";

@Directive({
  selector: "[appBoxShadow]"
})
export class BoxShadowDirective {
  @Input("appBoxShadow") creationDate: Date;

  constructor(private el: ElementRef) {
    console.log(this.creationDate + " DTAE");
    const today: Date = new Date();
    if (
      this.creationDate < today &&
      this.creationDate >= new Date(today.setDate(today.getDate() - 14))
    ) {
      el.nativeElement.style.boxShadow = "0 1px 24px 0 green";
    } else if (this.creationDate > today) {
      el.nativeElement.style.boxShadow = "0 1px 24px 0 blue";
    }
  }
}
