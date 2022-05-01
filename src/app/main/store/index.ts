import { ActionReducerMap } from "@ngrx/store";
import { user, userReducer, UserState } from "./proj.reducer";

export interface State {
    [user]: UserState;
}

export const reducers: ActionReducerMap<State, any> = {
    [user]: userReducer
};
