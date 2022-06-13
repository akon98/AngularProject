import { createAction, props } from "@ngrx/store";



export const basketAddActionsType = "[BASKET]ADD_ITEM";
export const basketDeleteActionsType = "[BASKET]DELETE_ITEM";
export const basketClearActionsType = "[BASKET]CLEAR_ITEM";

export const add = createAction(
    basketAddActionsType,
    props<any>()
)

export const deleteItem = createAction(
    basketDeleteActionsType,
    props<{ value: number}>()
)
export const clear = createAction(
    basketClearActionsType
)