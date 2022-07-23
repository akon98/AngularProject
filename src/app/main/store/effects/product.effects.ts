import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { ServerService } from "../../sevices/server.service";
import * as productActions from "../actions/product.actions"


@Injectable()
export class ProductEffects {
    constructor (private actions$: Actions, private serverService: ServerService) {}
    productLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.load),
      exhaustMap(() => {
        console.log( "effects of product");
        return this.serverService.getProduct().pipe(
          map((response) => {
              console.log(response, "effects of product loaded");
              return productActions.loadSuccess({response}) }),
              )
          })
    )
  );
}