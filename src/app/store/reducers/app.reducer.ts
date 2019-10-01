import { listCourses, onFoundCourseById } from "../actions/courses.actions";
import { login, logout, assignLoggedUser } from "../actions/auth.actions";
import { createReducer, on, State } from "@ngrx/store";
import { initialAppState } from "../state/app.state";

const _reducer = createReducer(
  initialAppState,
  on(assignLoggedUser, (state, { loggedUser }) => ({
    ...state,
    activeUser: loggedUser
  })),
  on(logout, state => ({ ...state, activeUser: null })),
  on(listCourses, (state, { courses }) => ({
    ...state,
    courses: courses.slice(0)
  })),
  on(onFoundCourseById, (state, { foundCourseById }) => ({
    ...state,
    selectedCourse: foundCourseById
  }))
);

export function reducer(state, action) {
  return _reducer(state, action);
}
