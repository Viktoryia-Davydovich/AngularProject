import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CourselistComponent } from "./components/pages/courses/courselist/courselist.component";
import { LoginComponent } from "./components/pages/login/login.component";

const routes: Routes = [
  { path: "courses", component: CourselistComponent },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "/courses" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
