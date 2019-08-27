import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { IBreadcrumb } from 'src/app/models/Breadcrumb';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'], 
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: IBreadcrumb[] = [];
  route: string;
  breadcrumbList: string[];
  initialUrl

  constructor( private activatedRoute: ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {
    this.getBreadcrumbs()
  }
  
  private getBreadcrumbs() {
      this.router.events.subscribe((val) => {
          if (location.pathname !== '') {
              this.route = location.pathname;
              this.breadcrumbList = this.route.split('/');
              this.breadcrumbList = this.breadcrumbList.slice(1, this.breadcrumbList.length);
              for (let i = 0; i < this.breadcrumbList.length; i++) {
                  if (i !== 0) {
                      this.initialUrl = this.breadcrumbs[i - 1];
                  } else {
                      this.initialUrl = '/';
                  }
                  const breadCrumbObj = {
                      name: this.breadcrumbList[i],
                      url: this.initialUrl + this.breadcrumbList[i],
                      id: i
                  };
                  this.breadcrumbs.push(breadCrumbObj);
              }
          } else {
              this.route = 'Courses';
          }
      });
  }

}
