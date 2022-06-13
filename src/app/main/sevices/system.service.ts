import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ProductState } from "../store/reducers/product.reducer";


@Injectable({
    providedIn: "root",
  })
  export class SystemService {
    battonValue: string[] = [];
    productsInBasket: number = 0;
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
    changeBattonStatusToInitial(i: number) {
        this.battonValue[i] = "Купить";
    }
    clearBasketCount() {
        this.productsInBasket = 0;
    }
  }