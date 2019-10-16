import { createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";

export interface AppState {
  appState: IAppState;
}

export const selectApp = (state: AppState): IAppState => state.appState;

export const userInfo = (state: IAppState) => state.userInfo;
export const courses = (state: IAppState) => state.courses;
export const selectedCourse = (state: IAppState) => state.selectedCourse;
export const authors = (state: IAppState) => state.authors;

export const selectUserInfo = createSelector(
  selectApp,
  userInfo
);

export const selectCourses = createSelector(
  selectApp,
  courses
);

export const selectSelectedCourse = createSelector(
  selectApp,
  selectedCourse
);

export const selectAuthors = createSelector(
  selectApp,
  authors
);
