import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CourselistComponent } from "./components/pages/courses/courselist/courselist.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { AddCourseComponent } from "./components/pages/courses/add-course/add-course.component";

const routes: Routes = [
  { path: "courses", component: CourselistComponent },
  { path: "login", component: LoginComponent },
  { path: "addcourse", component: AddCourseComponent },
  { path: "**", redirectTo: "/courses" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
