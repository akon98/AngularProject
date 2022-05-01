import { RouterModule, Routes } from "@angular/router";
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
    { path: 'form', component: FormComponent}
    //{ path: '**', component: NotFoundComponent }
  ];

export const routing = RouterModule.forRoot(routes);