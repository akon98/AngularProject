import { RouterModule, Routes } from "@angular/router";
import { BasketComponent } from "./main/basket/basket.component";
import { ConfGuard } from "./main/conf.guard";
import { ConfComponent } from "./main/conf/conf.component";
import { FormComponent } from "./main/form/form.component";
import { MainComponent } from "./main/main.component";

/*
const appRoutes: Routes =[
    { path: '', component: MainComponent},
    { path: 'form', component: FormComponent}
    //{ path: '**', component: NotFoundComponent }
  ];
*/
const routes: Routes = [
    { path: '', component: MainComponent},
    { path: 'form', component: FormComponent},
    { path: 'conf', component: ConfComponent, canActivate: [ConfGuard]},
    { path: 'basket', component: BasketComponent}
    //{ path: '**', component: NotFoundComponent }
  ];

export const routing = RouterModule.forRoot(routes);