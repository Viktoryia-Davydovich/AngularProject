import { Directive, Input, ElementRef } from "@angular/core";

@Directive({
  selector: "[appBoxShadow]"
})
export class BoxShadowDirective {
  @Input("appBoxShadow") date: Date;
  element: ElementRef;

  constructor(private el: ElementRef) {
    this.element = el;
  }

  ngOnInit() {
    this.setBoxShadow();
  }

  setBoxShadow() {
    const today: Date = new Date();
    if (
      this.date < today &&
      this.date >= new Date(today.setDate(today.getDate() - 14))
    ) {
      this.el.nativeElement.style.boxShadow = "0 1px 24px 0 rgb(163,240,183)";
    } else if (this.date > today) {
      this.el.nativeElement.style.boxShadow = "0 1px 24px 0 rgb(160,200,235)";
    }
  }
}
