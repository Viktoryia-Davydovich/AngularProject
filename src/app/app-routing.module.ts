import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../app/auth/auth.guard";

import { CourselistComponent } from "./components/pages/courses/courselist/courselist.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { NotFoundComponent } from "./components/pages/not-found/not-found.component";
import { EditablecourseComponent } from "./components/pages/courses/editablecourse/editablecourse.component";

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
        component: EditablecourseComponent,
        data: { breadcrumb: " / new course" }
      },
      {
        path: ":id",
        component: EditablecourseComponent,
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
