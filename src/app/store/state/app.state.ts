import { User, LoggedUser } from "src/app/models/User";
import { Course } from "src/app/models/Course";

export interface IAppState {
  courses: Course[];
  selectedCourse: Course;
  activeUser: User;
  isAuthenticated: boolean;
}

export const initialAppState: IAppState = {
  courses: null,
  selectedCourse: null,
  activeUser: null,
  isAuthenticated: false
};
