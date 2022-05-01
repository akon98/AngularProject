import { createFeatureSelector, createSelector } from "@ngrx/store";
import { user, UserState } from "./proj.reducer";


export const selectUserFeature = createFeatureSelector<UserState>(user);

export const selectUser = createSelector(
    selectUserFeature,
    (state: UserState) => state.user,
);
