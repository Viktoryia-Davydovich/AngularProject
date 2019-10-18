import { Component, OnInit } from "@angular/core";
import { Subscription, Subject } from "rxjs";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.css"]
})
export class LoaderComponent implements OnInit {
  show: boolean;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.asObservable().subscribe((val: boolean) => {
      this.show = val;
    });
  }

  ngOnInit() { }
}
