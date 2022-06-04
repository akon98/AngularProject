import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subject, throwError } from "rxjs";
import { User } from "../user";


@Injectable({
  providedIn: "root",
})
export class ServerService {
    users: User[] = [{ id: 2, login: "sad1", password: "asdsad" }];
    constructor(private http: HttpClient){ }
    getUser() {
        //return this.http.get("./assets/data.json") as Observable<User>;
        return this.http.get("/api/users");
    }
    postUser(body: any) {
        return this.http.post("/api/users", body);
    }
    getUserByLogin(body: any) {
        console.log(body, "service")
        return this.http.post("/api/users/login", body);
    }
    postUserByLogin(body: any) {
        console.log(body, "service signup");
        return this.http.post("/api/users/signup", body);
    }
    createProduct(body: any) {
        console.log(body, "service createprod");
        return this.http.post("/api/product/create", body).pipe(
            catchError(this.handleError)
          );
    }
    getProduct() {
      console.log("service of effect prod load");
      return this.http.get("/api/product");
    }
    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }
}