import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { UserState } from "./store/proj.reducer";
import { selectUser } from "./store/proj.selectors";
import { User } from "./user";

@Injectable({
    providedIn: "root",
  })
export class ConfGuard implements CanActivate {
    constructor(private store$: Store<UserState>) {}
    public user$: Observable<User> = this.store$.pipe(select(selectUser));
    user!: User;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const sub = this.user$.subscribe((data) => {
            this.user = new User(data.login, data.password, data.id, data.isAdmin);
          });
        if (this.user.isAdmin === true) return true;
        return false;
    }
}