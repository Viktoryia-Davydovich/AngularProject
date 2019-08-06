import { Directive, Input, ElementRef } from "@angular/core";

@Directive({
  selector: "[appBoxShadow]"
})
export class BoxShadowDirective {
  @Input("appBoxShadow") creationDate: Date;
  element: ElementRef;

  constructor(private el: ElementRef) {
    this.element = el;
  }

  ngOnInit() {
    this.setBoxShadow();
  }

  setBoxShadow() {
    console.log(this.creationDate);
    const today: Date = new Date();
    if (
      this.creationDate < today &&
      this.creationDate >= new Date(today.setDate(today.getDate() - 14))
    ) {
      this.el.nativeElement.style.boxShadow = "0 1px 24px 0 rgb(163,240,183)";
    } else if (this.creationDate > today) {
      this.el.nativeElement.style.boxShadow = "0 1px 24px 0 rgb(160,200,235)";
    }
  }
}
