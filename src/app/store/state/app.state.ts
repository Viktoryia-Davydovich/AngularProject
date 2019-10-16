import { User, LoggedUser } from "src/app/models/User";
import { Course } from "src/app/models/Course";
import { Author } from "src/app/models/Author";

export interface IAppState {
  courses: Course[];
  selectedCourse: Course;
  userInfo: LoggedUser;
  authors: Author[];
}

export const initialAppState: IAppState = {
  courses: null,
  selectedCourse: null,
  userInfo: null,
  authors: null
};
