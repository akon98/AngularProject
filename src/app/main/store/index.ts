import { ActionReducerMap } from "@ngrx/store";
import { user, userReducer, UserState } from "./proj.reducer";
import { basket, basketReducer, BasketState } from "./reducers/basket.reducer";
import { product, productReducer, ProductState } from "./reducers/product.reducer";

export interface State {
    [user]: UserState;
    [product]: ProductState;
    [basket]: BasketState
}

export const reducers: ActionReducerMap<State, any> = {
    [user]: userReducer,
    [product]: productReducer,
    [basket]: basketReducer
};
