import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { ServerService } from "../sevices/server.service";
import { User } from "../user";
import * as userActions from "./proj.actions"

@Injectable()
export class UserEffects {
    constructor (private actions$: Actions, private serverService: ServerService, private router: Router) {
    }
    userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.login),
      exhaustMap((action) => {
          console.log(action.user, "effects1");
        return this.serverService.getUserByLogin(action.user).pipe(
          map((response) => {
              console.log(response, "effects");
              this.router.navigate(['']);
              return userActions.loginSuccess({...response, id: (response as any)?._id})}),
          catchError((error: any) => {
            console.log("work at effect fail");
            return of(userActions.loginFailure(error))}))
          })
    )
  );
  userSignup$ = createEffect(() =>
  this.actions$.pipe(
    ofType(userActions.signup),
    exhaustMap((action) => {
        console.log(action.user, "effects1 signup");
      return this.serverService.postUserByLogin(action.user).pipe(
        map((response) => {
            console.log(response, "effects signup");
            this.router.navigate(['']);
            return userActions.signupSuccess(response)}),
        catchError((error: any) => {
          console.log("signup work at effect fail");
          return of(userActions.loginFailure(error))}))
        })
  )
);
}