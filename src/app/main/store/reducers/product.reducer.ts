import { createReducer, on } from "@ngrx/store";
import { Product } from "../../product";
import * as productActions from "../actions/product.actions"

export const product = "product";

export interface ProductState {
    product: Product[];
}

const initialState: ProductState = {
    product: [{ name: "Кроссовки FORUM LOW CITY",price: 100, url: "/static/shoes/1.png"}]
}
//on(userActions.loginSuccess, (state, result) => ({user: result})),
//on(userActions.loginFailure, (state) => ({user: { id: 0, login: "", password: "1111"}})),
export const productReducer = createReducer(
    initialState,
    on(productActions.load, (state) => (state)),
    on(productActions.loadSuccess, (state, result) => ({...state, product: result})),
    on(productActions.destroy, (state) => (initialState))
);