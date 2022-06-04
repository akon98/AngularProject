import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { FileUploader } from "ng2-file-upload";
import { ServerService } from "../sevices/server.service";
import { ProductState } from "../store/reducers/product.reducer";

const URL = '/api/product/upload';
@Component({
    selector: 'conf-app',
    templateUrl: './conf.component.html',
    styleUrls: ['./conf.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfComponent {
    filename!: string;
    constructor(private fb: FormBuilder, private store$: Store<ProductState>, private elementRef: ElementRef, private http: HttpClient, private serverService: ServerService) {}
    productForm: FormGroup = this.fb.group({
      product: this.fb.group({
        //id: [null, Validators.required],
        name: [null, [Validators.required, Validators.minLength(2)]],
        price: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
        url: [{ value: "/static/product/" + this.filename + ".png", disabled: true},[Validators.required, Validators.minLength(2)]]
      })
    });
    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#ebebeb';
    }
    submit() {
        const out = this.productForm.value.product;
        const body = {product: { name: out.name, price: out.price, url: out.url }};
        console.log(body)
        return this.serverService.createProduct(body).subscribe((data) => console.log(data));
    }
    public uploader: FileUploader = new FileUploader({
      url: URL,
      itemAlias: 'image',
    });
    ngOnInit() {
      this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false;
      };
      this.uploader.onCompleteItem = (item: any, status: any) => {
        console.log('Uploaded File Details:', item);
        //this.toastr.success('File successfully uploaded!');
      };
    }
    onFileSelected(event: any) {
      console.log("file selected")
      if(event.target.files.length > 0) 
       {
         console.log(event.target.files[0].name.split('.')[0]);
         this.filename = event.target.files[0].name.split('.')[0];
         this.productForm.patchValue({ product: { url: "/static/product/" + this.filename + ".png"}});
       }
       const out = this.productForm.value.product;
       const body = {product: { name: out.name, price: out.price, url: out.url }};
       console.log(body)
       return this.serverService.createProduct(body).subscribe((data) => console.log(data));
     }
}