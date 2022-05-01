import { HttpClient } from "@angular/common/http";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostBinding, ElementRef } from "@angular/core";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { UserState } from "../store/proj.reducer";
import { User } from "../user";
import * as userActions from "../store/proj.actions"


@Component({
    selector: "app-form",
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
    @Input() users: User[] = [];
    @Input() isEdit: boolean = false;
    @Input() index: number | null = null;
    @Output() changed = new EventEmitter<boolean>();
    isLog: boolean = true;
    // editing: string;

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private store$: Store<UserState>, private elementRef: ElementRef) {}
    userForm: FormGroup = this.fb.group({
      user: this.fb.group({
        //id: [null, Validators.required],
        login: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(16), 
          Validators.pattern("^[a-zA-Z0-9]+$")/*Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")*/]],
        password: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("^[a-zA-Z0-9]+$")]]
      })
    });
    submit(): void {
      // console.log(this.studForm.value.student);
      this.users.push(this.userForm.value.user);
      //this.store$.dispatch(new UserCreateAction(this.userForm.value.user));
      const out = this.userForm.value.user;
      //this.store$.dispatch(userActions.login(this.userForm.value.user))
      this.store$.dispatch(userActions.login({user: { id: out.id, login: out.login, password: out.password }}));
    }
    ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = '#ebebeb';
  }
  swapMenuOnSignUp(): void {
    this.isLog = false;
  }
  swapMenuOnLogIn(): void {
    this.isLog = true;
  }
  signup(): void {
    const out = this.userForm.value.user;
    this.store$.dispatch(userActions.signup({user: { id: out.id, login: out.login, password: out.password }}));
  }
}