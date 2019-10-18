import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { LoaderService } from "../services/loader.service";
import { finalize } from "rxjs/operators";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `${localStorage.getItem("this_user")}`
      }
    });
    return next.handle(request);
  }
}
