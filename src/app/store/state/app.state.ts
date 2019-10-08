import { User, LoggedUser } from "src/app/models/User";
import { Course } from "src/app/models/Course";
import { Author } from "src/app/models/Author";

export interface IAppState {
  courses: Course[];
  selectedCourse: Course;
  userInfo: LoggedUser;
  isAuthenticated: boolean;
  authors: Author[];
}

export const initialAppState: IAppState = {
  courses: null,
  selectedCourse: null,
  userInfo: null,
  isAuthenticated: false,
  authors: null
};
