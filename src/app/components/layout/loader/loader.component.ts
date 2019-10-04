import { Component, OnInit } from "@angular/core";
import { Subscription, Subject } from "rxjs";
import { LoaderService } from "src/app/core/services/loader.service";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.css"]
})
export class LoaderComponent implements OnInit {
  show: Subject<boolean>;

  constructor(private loaderService: LoaderService) {
    this.show = this.loaderService.isLoading;
  }

  ngOnInit() {}
}
