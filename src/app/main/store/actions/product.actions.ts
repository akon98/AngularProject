import { createAction, props } from "@ngrx/store"
import { Product } from "../../product"


export const productLoadActionsType = "[PRODUCT]LOAD_PRODUCT"
export const productLoadSuccessActionsType = "[PRODUCT]LOAD_PRODUCT_SUCCESS"
export const productDestroyActionsType = "[PRODUCT]PRODUCT_DESTROY"

export const load = createAction(
    productLoadActionsType
)
export const loadSuccess = createAction(
    productLoadSuccessActionsType,
    props<any>()
)
export const destroy = createAction(
    productDestroyActionsType
)