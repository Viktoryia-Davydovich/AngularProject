import { Component, OnInit, Input } from "@angular/core";
import { Course, NewCourse, ICourse } from "src/app/models/Course";
import { ActivatedRoute } from "@angular/router";
import { CourseService } from "src/app/core/services/course.service";

@Component({
  selector: "app-add-course",
  templateUrl: "./add-edit-course.component.html",
  styleUrls: ["./add-edit-course.component.css"]
})
export class AddCourseComponent implements OnInit {
  editedCourse: Course;
  @Input() addedCourse: NewCourse;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(typeof +params.get("id") === 'number'){
        let id = +params.get("id");
        this.editedCourse = this.courseService.getCourseById(id);
      }
    });
  }

  addCourse(){
    console.log(this.addedCourse)
    this.courseService.createCourse(this.addedCourse)   
  }
  
  updateCourse() {
    this.courseService.updateCourse(this.editedCourse);
    console.log(this.editedCourse)
  }
}
