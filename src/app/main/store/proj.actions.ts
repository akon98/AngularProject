import { HttpClient } from "@angular/common/http";
import { Action, createAction, props } from "@ngrx/store";
import { User } from "../user";

export const userActionsType = "[USER]ADD_USER";
export const userEditActionsType = "[USER]EDIT_USER";
export const userLoginActionsType = "[USER]LOGIN_USER";
export const userLoginSuccessActionsType = "[USER]LOGIN_USER_SUCCESS";
export const userLoginErrorActionsType = "[USER]LOGIN_USER_ERROR";
export const userLoginExitActionsType = "[USER]LOGIN_USER_EXIT";
export const userSignupActionsType = "[USER]SIGNUP_USER";
export const userSignupSuccessActionsType = "[USER]SIGNUP_USER_SUCCESS";



export const login = createAction(
    userLoginActionsType,
    props<{user: User}>()
  );
export const loginSuccess = createAction(
    userLoginSuccessActionsType,
    props<any>()
  )
export const loginFailure = createAction(
    userLoginErrorActionsType,
    props<{message: string}>()
  )
export const loginExit = createAction(
    userLoginErrorActionsType
  )
export const signup = createAction(
  userSignupActionsType,
  props<{user: User}>()
);
export const signupSuccess = createAction(
  userSignupSuccessActionsType,
  props<any>()
)