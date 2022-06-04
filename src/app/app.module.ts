import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { FormComponent } from './main/form/form.component';
import { MainComponent } from './main/main.component';
import { reducers } from './main/store';
import { UserEffects } from './main/store/proj.effects';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfComponent } from './main/conf/conf.component';
import { ProductEffects } from './main/store/effects/product.effects';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { ConfGuard } from './main/conf.guard';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FormComponent,
    ConfComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([UserEffects, ProductEffects]),
    StoreRouterConnectingModule.forRoot(),
    FontAwesomeModule,
    FileUploadModule
  ],
  providers: [ConfGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }



