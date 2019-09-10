import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

/*Font awesome*/
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendarAlt,
  faPencilAlt,
  faTrash,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LogoComponent } from "./components/logo/logo.component";
import { HeaderComponent } from "./components/layout/header/header.component";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { BreadcrumbsComponent } from "./components/layout/breadcrumbs/breadcrumbs.component";
import { CourseComponent } from "./components/pages/courses/course/course.component";
import { CourselistComponent } from "./components/pages/courses/courselist/courselist.component";
import { CoursescontrolComponent } from "./components/pages/courses/coursescontrol/coursescontrol.component";
import { DurationPipe } from "./shared/pipes/duration.pipe";
import { BoxShadowDirective } from "./shared/directives/box-shadow.directive";
import { FilterPipe } from "./shared/pipes/filter.pipe";
import { LoginComponent } from "./components/pages/login/login.component";
import { OrderByDatePipe } from "./shared/pipes/order-by-date.pipe";
import { NotFoundComponent } from "./components/pages/not-found/not-found.component";
import { AddcourseComponent } from "./components/pages/courses/addcourse/addcourse.component";
import { EditcourseComponent } from "./components/pages/courses/editcourse/editcourse.component";
import { TokenInterceptor } from "./auth/http-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    CourseComponent,
    CourselistComponent,
    CoursescontrolComponent,
    DurationPipe,
    BoxShadowDirective,
    FilterPipe,
    LoginComponent,
    OrderByDatePipe,
    NotFoundComponent,
    AddcourseComponent,
    EditcourseComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faCalendarAlt, faPencilAlt, faTrash, faClock, faStar);
  }
}
