import { Course, EditableCourse } from 'src/app/models/Course';
import { LoggedUser } from 'src/app/models/User';
import {addCourse, deleteCourse, updateCourse, findCourse, listCourses, getCourseById} from '../actions/courses.actions';
import {login, logout} from '../actions/auth.actions';
import { AuthService } from "src/app/core/services/auth.service";
import { CourseService } from "src/app/core/services/course.service";
import { createReducer, on, State } from '@ngrx/store';
import { initialAppState } from '../state/app.state';

const _reducer = createReducer(initialAppState,
    on(login, (state, {login, password}) => ({...state})),
    on(logout, state =>  ({...state, activeUser: state.activeUser})),
    on(addCourse, (state, {course}) => ({...state})),
    on(deleteCourse, (state, {id}) => ({...state})),
    on(updateCourse, (state, {course}) => ({...state})),
    on(listCourses, (state, {courses}) => ({...state, courses: courses.slice(0)})),
    on(findCourse, (state, {searchString}) => ({...state})),
    on(getCourseById, (state, {id}) => ({...state}))    
    )

export function reducer(state, action) {
    return _reducer(state, action);
}