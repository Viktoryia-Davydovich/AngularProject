import { User, LoggedUser } from "src/app/models/User";
import { Course } from "src/app/models/Course";

export interface IAppState {
  courses: Course[];
  selectedCourse: Course;
  userInfo: LoggedUser;
  isAuthenticated: boolean;
}

export const initialAppState: IAppState = {
  courses: null,
  selectedCourse: null,
  userInfo: null,
  isAuthenticated: false
};
