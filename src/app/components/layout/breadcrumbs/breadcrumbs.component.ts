import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.css"]
})
export class BreadcrumbsComponent implements OnInit {
  route: string;
  breadcrumbList: string[];

  constructor() {}

  ngOnInit() {}

  ngOnChange() {
    this.getBreadcrumbs();
  }

  private getBreadcrumbs() {
    if (location.pathname !== "") {
      this.route = location.pathname;
      this.breadcrumbList = this.route.split("/");
      this.breadcrumbList = this.breadcrumbList.slice(
        1,
        this.breadcrumbList.length
      );
    }
  }
}
