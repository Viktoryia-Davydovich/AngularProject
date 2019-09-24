import { Course, EditableCourse } from 'src/app/models/Course';
import { LoggedUser } from 'src/app/models/User';
import * as courses from '../actions/courses.actions';
import * as auth from '../actions/auth.actions';
import { AuthService } from "src/app/core/services/auth.service";
import { CourseService } from "src/app/core/services/course.service";

export interface State{
    courses: Course[]
    selectedCourse: Course
    activeUser: LoggedUser
    isAuthenticated: boolean
}


export const initialState: State = {
    courses: [],
    selectedCourse: new Course(),
    activeUser: new LoggedUser(),
    isAuthenticated: false
  };


  export function reducer(state = initialState, action: courses.Actions | auth.Actions): State {
    switch(action.type){
    case courses.DELETE_COURSE: {
        return 
    }
    case courses.UPDATE_COURSE: {
        return
    }
    case courses.NEW_COURSE: {
        return
    }
    case courses.FIND_COURSE: {
        return
    }
    case courses.LIST_COURSES: {
        return
    }
    case courses.GET_COURSE_BY_ID: {
        return
    }
    case auth.LOGIN: {
        return
    }
    case auth.LOGOUT: {
        return
    }

    case courses.COURSES_LOADED: {
        const incomingCourses = action.payload;
        state.courses = incomingCourses.slice(0);
    }

    }
  }