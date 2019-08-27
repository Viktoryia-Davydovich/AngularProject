import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";

import { CourselistComponent } from "./components/pages/courses/courselist/courselist.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { AddCourseComponent } from "./components/pages/courses/addEditCourse/add-edit-course.component";
import { NotFoundComponent } from "./components/pages/not-found/not-found.component";

const routes: Routes = [
  { path: "login", component: LoginComponent, data: { breadcrumb: "login" } },
  {
    path: "courses/:id",
    component: AddCourseComponent,
    data: { breadcrumb: "edit course" },
    canActivate: [AuthGuard]
  },
  {
    path: "courses/new",
    component: AddCourseComponent,
    data: { breadcrumb: "new course" },
    canActivate: [AuthGuard]
  },
  {
    path: "courses",
    component: CourselistComponent,
    data: { breadcrumb: "courses" }
  },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "/courses" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
