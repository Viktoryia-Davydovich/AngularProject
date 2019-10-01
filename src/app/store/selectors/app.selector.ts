import { createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";

export const activeUser = (state: IAppState) => state.activeUser;
export const isAuthenticated = (state: IAppState) => state.isAuthenticated;
export const courses = (state: IAppState) => state.courses;
export const selectedCourse = (state: IAppState) => state.selectedCourse;

export const selectActiveUser = createSelector(
  activeUser,
  state => state
);

export const selectIsAuthenticated = createSelector(
  isAuthenticated,
  state => state
);

export const selectCourses = createSelector(
  courses,
  state => state
);

export const selectSelectedCourse = createSelector(
  selectedCourse,
  state => state
);
