import { createFeatureSelector, createSelector } from "@ngrx/store";
import { user, UserState } from "./proj.reducer";
import { product, ProductState } from "./reducers/product.reducer";


export const selectUserFeature = createFeatureSelector<UserState>(user);

export const selectUser = createSelector(
    selectUserFeature,
    (state: UserState) => state.user,
);

export const selectProductFeature = createFeatureSelector<ProductState>(product);

export const selectProduct = createSelector(
    selectProductFeature,
    (state: ProductState) => state.product,
)