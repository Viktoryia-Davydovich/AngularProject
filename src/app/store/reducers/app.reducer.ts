import {
  listCourses,
  onFoundCourseById,
  listAuthors
} from "../actions/courses.actions";
import {
  logout,
  assignUserInfo
} from "../actions/auth.actions";
import { createReducer, on, State } from "@ngrx/store";
import { initialAppState } from "../state/app.state";

const _reducer = createReducer(
  initialAppState,
  on(assignUserInfo, (state, { userInfo }) => ({
    ...state,
    userInfo: userInfo
  })),
  on(logout, state => {
    localStorage.removeItem("this_user");
    return { ...state, userInfo: null };
  }),
  on(listCourses, (state, { courses }) => ({
    ...state,
    courses: courses.slice(0)
  })),
  on(onFoundCourseById, (state, { foundCourseById }) => ({
    ...state,
    selectedCourse: foundCourseById
  })),
  on(listAuthors, (state, { authors }) => ({ ...state, authors: authors }))
);

export function reducer(state, action) {
  return _reducer(state, action);
}
