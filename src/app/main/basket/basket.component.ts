import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Product } from "../product";
import { selectBasket } from "../store/proj.selectors";
import { BasketState } from "../store/reducers/basket.reducer";
import { faTrashCan} from '@fortawesome/free-solid-svg-icons';
import * as basketActions from "../store/actions/basket.actions"
import { SystemService } from "../sevices/system.service";

@Component({
    selector: 'conf-app',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent {
    public basket$: Observable<Product[]> = this.storeBasket$.pipe(select(selectBasket));
    basket: Product[] = [];
    summ: number = 0;
    trashcan = faTrashCan;
    constructor(private storeBasket$: Store<BasketState>, private ref: ChangeDetectorRef, private elementRef: ElementRef,
        private systemService: SystemService) {}
    ngOnInit() {
          const sub = this.basket$.subscribe((data) => {
            this.basket = data;
            for (let value of this.basket) {
                this.summ += value.price;
            }
            this.ref.detectChanges();
          })
    }
    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#ebebeb';
    }
    deleteItem(i: number) {
        console.log(this.basket.length)
        this.summ = 0;
        this.systemService.minusBasket();
        console.log(this.basket[i])
        this.systemService.changeBattonStatusToInitial(this.basket[i]);
        if (this.basket.length === 1 ) {
            console.log("done")
            this.storeBasket$.dispatch(basketActions.clear());
            this.ref.detectChanges();
        }
        this.storeBasket$.dispatch(basketActions.deleteItem({value : i}));
    }
}