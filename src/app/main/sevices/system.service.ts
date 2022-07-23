import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { filter, Observable } from "rxjs";
import { Product } from "../product";
import { ProductState } from "../store/reducers/product.reducer";
import { selectProduct } from '../store/proj.selectors';


@Injectable({
    providedIn: "root",
  })
  export class SystemService {
    battonValue: string[] = [];
    productsInBasket: number = 0;
    public product$: Observable<Product[]> = this.storeProduct$.pipe(select(selectProduct));
    constructor(private storeProduct$: Store<ProductState>) {}
    saveBattonValues(value: string) {
        this.battonValue.push(value);
    }
    getBattonValue() {
        return this.battonValue;
    }
    changeBattonValue(i: number) {
        this.battonValue[i] = "В корзине";
    }
    countBasket() {
        this.productsInBasket += 1;
    }
    getCountBasket() {
        return this.productsInBasket;
    }
    minusBasket() {
        this.productsInBasket -= 1;
    }
    changeBattonStatusToInitial(item: Product) {
        console.log("dsasd")
        let sub = this.product$.subscribe( data => {
            console.log("daaa",data)
            let i = data.findIndex( value => value.name == item.name);
            console.log(i, "вввв")
            this.battonValue[i] = "Купить";
        })
        //this.battonValue[i] = "Купить";
        sub.unsubscribe();
        console.log(this.battonValue)
    }
    clearBasketCount() {
        this.productsInBasket = 0;
    }
  }