import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { catchError, Observable, Subscription, throwError } from 'rxjs';
import { UserState } from './store/proj.reducer';
import { selectUser } from './store/proj.selectors';
import { User } from './user';
import { faUser, faMagnifyingGlass, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import * as userActions from "./store/proj.actions"
  
@Component({
    selector: 'main-app',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
    private subscriptions: Subscription[] = [];
    public user$: Observable<User> = this.store$.pipe(select(selectUser));
    users: User[] = [{ id: 1, login: "sad", password: "asd" }];
    public user: User = { id: 1, login: "sad", password: "asd" };
    constructor(private ref: ChangeDetectorRef, private store$: Store<UserState>, private http: HttpClient, private elementRef: ElementRef) {}
    ngOnInit(): void {
        const sub = this.user$.subscribe((data) => {
            /*for (const value of data) {
              this.users.push(new User(value.id, value.login, value.password));
            }*/
            console.log(data, "main")
            this.users.push(new User(data.login, data.password, data.id));
            this.user = new User(data.login, data.password, data.id);
          });
          this.subscriptions.push(sub);
        }
    boom(): void {
      const sub1 = this.http.get("/api/users").subscribe((data) => console.log(data));
      this.subscriptions.push(sub1);
    }
    ngAfterViewInit(): void {
      this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = 'white';
  }

    faUser = faUser;
    search = faMagnifyingGlass;
    exit = faArrowRightFromBracket;
    isUserLoged(): boolean {
      if (this.user.login === "") return false;
      return true;
    }
    leave(): void {
      this.store$.dispatch(userActions.loginExit());
    }
    ngOnDestroy() {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
 }