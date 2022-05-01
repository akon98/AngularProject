import { Action, createReducer, on } from "@ngrx/store";
import { User } from "../user";
import { userActionsType, userEditActionsType, userLoginActionsType, userLoginSuccessActionsType } from "./proj.actions";
import * as userActions from "./proj.actions"

export const user = "user";

export interface UserState {
    user: User;
}

const initialState: UserState = {
    user: { id: 0, login: "", password: "1111"}
};

export const userReducer = createReducer(
    initialState,
    on(userActions.login, (state, {user}) => ({user})),
    on(userActions.loginSuccess, (state, result) => ({user: result})),
    on(userActions.loginFailure, (state) => ({user: { id: 0, login: "", password: "1111"}})),
    on(userActions.loginExit, (state) => ({user: { id: 0, login: "", password: "1111"}})),
    on(userActions.signup, (state, {user}) => ({user})),
    on(userActions.signupSuccess, (state, result) => ({user: result})),
);
