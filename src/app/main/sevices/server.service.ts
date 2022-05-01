import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
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
}