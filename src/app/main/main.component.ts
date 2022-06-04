import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { catchError, Observable, Subscription, throwError, forkJoin } from 'rxjs';
import { UserState } from './store/proj.reducer';
import { selectProduct, selectUser } from './store/proj.selectors';
import { User } from './user';
import { faUser, faMagnifyingGlass, faArrowRightFromBracket, faGear } from '@fortawesome/free-solid-svg-icons';
import * as userActions from "./store/proj.actions"
import { ImageService } from './sevices/image.service';
import { ProductState } from './store/reducers/product.reducer';
import { Product } from './product';
import * as productActions from "./store/actions/product.actions"
import { FileUploader } from 'ng2-file-upload';


@Component({
    selector: 'main-app',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
    selectedFile!: File;
    imgsrc!: string | ArrayBuffer | null;
    img!: any;
    imgdata: string[] = [];
    uploadApiUrl: string = "/static/shoes/1.png"
    private subscriptions: Subscription[] = [];
    public user$: Observable<User> = this.store$.pipe(select(selectUser));
    public product$: Observable<Product[]> = this.storeProduct$.pipe(select(selectProduct));
    users: User[] = [{ id: 1, login: "sad", password: "asd" }];
    products: Product[] = [];
    public user: User = { id: 1, login: "sad", password: "asd" };
    constructor(private ref: ChangeDetectorRef, private store$: Store<UserState>, private http: HttpClient, private elementRef: ElementRef, 
      private imageService: ImageService, private storeProduct$: Store<ProductState>) {}
    ngOnInit(): void {
        const sub = this.user$.subscribe((data) => {
            /*for (const value of data) {
              this.users.push(new User(value.id, value.login, value.password));
            }*/
            console.log(data, "main")
            this.users.push(new User(data.login, data.password, data.id, data.isAdmin));
            this.user = new User(data.login, data.password, data.id, data.isAdmin);
          });
          this.subscriptions.push(sub);
          this.ref.detectChanges();
          //this.store$.dispatch(productActions.load());
          this.storeProduct$.dispatch(productActions.load());
          const sub1 = this.product$.subscribe(((data) => {
            //this.products.push(data);
              //this.products = data;
              console.log(data)
              this.products = Object.values(data);
              this.products.pop();
              console.log(this.products)
              console.log(this.products.length)
              for (let image of this.products) {
                console.log(image)
                this.imageService.getImage(image.url).subscribe((src) => {
                  // Get the blob
                  const reader = new FileReader();
                  reader.readAsDataURL(src); 
                  reader.onloadend = () => {
                  // result includes identifier 'data:image/png;base64,' plus the base64 data
                     let temp = reader.result;
                     if (typeof temp === "string")
                     this.imgdata.push(temp); 
                     this.ref.detectChanges();
                 }
               })
              }
          }));
          this.subscriptions.push(sub1);
        }
    boom(): void {
      this.http.get("/api/users").subscribe((data) => console.log(data));
    }
    ngAfterViewInit(): void {
      this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = 'white';
  }

    faUser = faUser;
    search = faMagnifyingGlass;
    exit = faArrowRightFromBracket;
    conf = faGear;
    isUserLoged(): boolean {
      if (this.user.login === "") return false;
      return true;
    }
    leave(): void {
      this.store$.dispatch(userActions.loginExit());
    }
    ngOnDestroy() {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
      this.products = [];
      this.imgdata = [];
      this.store$.dispatch(productActions.destroy());
    }
    getFullProductDB(): void {
      this.http.get("/api/product/getfulldb").subscribe((data) => console.log(data));
    }

}
