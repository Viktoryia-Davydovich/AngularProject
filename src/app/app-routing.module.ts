import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../app/auth/auth.guard";

import { CourselistComponent } from "./components/pages/courses/courselist/courselist.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { NotFoundComponent } from "./components/pages/not-found/not-found.component";
import { EditcourseComponent } from "./components/pages/courses/editcourse/editcourse.component";
import { AddcourseComponent } from "./components/pages/courses/addcourse/addcourse.component";

const routes: Routes = [
  { path: "login", component: LoginComponent, data: { breadcrumb: "login" } },
  {
    path: "courses",
    canActivate: [AuthGuard],
    data: { breadcrumb: " / courses" },
    children: [
      {
        path: "",
        component: CourselistComponent,
        data: { breadcrumb: undefined }
      },
      {
        path: "new",
        component: AddcourseComponent,
        data: { breadcrumb: " / new course" }
      },
      {
        path: ":id",
        component: EditcourseComponent,
        data: { breadcrumb: " / edit course" }
      }
    ]
  },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "/courses" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
