import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonRangeSliderModule } from "ng2-ion-range-slider";

import { AppComponent } from './app.component';

import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    IonRangeSliderModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
