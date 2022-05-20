import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";

import { SharedModule } from './shared/shared.module';
import { GifsModule } from './gifs/gifs.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //Este es el módulo que nos permite hacer consultas de http
    SharedModule,
    GifsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
