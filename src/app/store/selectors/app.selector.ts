import { createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";

export interface AppState {
  appState: IAppState;
}

export const selectApp = (state: AppState): IAppState => state.appState;

export const activeUser = (state: IAppState) => state.activeUser;
export const userInfo = (state: IAppState) => state.userInfo;
export const isAuthenticated = (state: IAppState) => state.isAuthenticated;
export const courses = (state: IAppState) => state.courses;
export const selectedCourse = (state: IAppState) => state.selectedCourse;

export const selectActiveUser = createSelector(
  selectApp,
  activeUser
);

export const selectUserInfo = createSelector(
  selectApp,
  userInfo
);

export const selectIsAuthenticated = createSelector(
  selectApp,
  isAuthenticated
);

export const selectCourses = createSelector(
  selectApp,
  courses
);

export const selectSelectedCourse = createSelector(
  selectApp,
  selectedCourse
);
