import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";


@Injectable({
    providedIn: "root",
  })
  export class ImageService {
    constructor(private http: HttpClient) {}
    getImage(uploadApiUrl: string): Observable<Blob> {
        return this.http.get(uploadApiUrl, { 
          headers: { 'Content-Type': 'application/octet-stream'}, 
          responseType: 'blob'
        });
      }
  }