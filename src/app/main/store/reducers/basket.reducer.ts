import { createReducer, on } from "@ngrx/store";
import { Product } from "../../product";
import * as basketActions from "../actions/basket.actions"

export const basket = "basket";

export interface BasketState {
    basket: Product[];
}

const initialState: BasketState = {
    basket: [{ name: "Нет товров", price: 0, url: "/static/shoes/1.png"}]
}

export const basketReducer = createReducer(
    initialState,
    //on(basketActions.add, (state, result) => ({...state, basket: [...state.basket, new Product(result.name, result.price, result.url)]})),
    on(basketActions.add, (state, result) => ({...state, basket: addOne(state, result)})),
    on(basketActions.deleteItem, (state, value) => ({...state, basket: deleteOne(state, value)})),
    on(basketActions.clear, (state) => (initialState))
);

function addOne(state: BasketState, result: any) {
    let values = [...state.basket];
    let values1 = values.filter(n => n.name !== "Нет товров");
    let res = [...values1, new Product(result.name, result.price, result.url)]
    return res;
}

function deleteOne(state: BasketState, i: any) {
    let values = [...state.basket];
    let j = i.value;
    values.splice(j, 1);
    return values;
}