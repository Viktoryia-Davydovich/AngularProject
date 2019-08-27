import { Component, OnInit } from "@angular/core";
import { IBreadcrumb } from "src/app/models/Breadcrumb";
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  Params,
  PRIMARY_OUTLET
} from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.css"]
})
export class BreadcrumbsComponent implements OnInit {
  route: string;
  breadcrumbs: IBreadcrumb[] = [];
  breadcrumbList: string[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        let root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
      });
  }

  ngAfterViewChecked() {}

  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string = "",
    breadcrumbs: IBreadcrumb[] = []
  ): IBreadcrumb[] {
    let children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (let child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      if (!child.snapshot.data.hasOwnProperty("breadcrumb")) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      let routeURL: string = child.snapshot.url
        .map(segment => segment.path)
        .join("/");

      url += `/${routeURL}`;

      let breadcrumb: IBreadcrumb = {
        label: child.snapshot.data["breadcrumb"],
        params: child.snapshot.params,
        url: url
      };
      breadcrumbs.push(breadcrumb);

      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
