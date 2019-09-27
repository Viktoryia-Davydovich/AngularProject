import { User, LoggedUser } from 'src/app/models/User';
import { Course } from 'src/app/models/Course';

export interface IAppState{
    courses: Course[];
    selectedCourse: Course;
    activeUser: User | undefined;
    isAuthenticated:boolean
}

export const initialAppState: IAppState = {
    courses: undefined,
    selectedCourse: undefined,
    activeUser: undefined,
    isAuthenticated: false
}