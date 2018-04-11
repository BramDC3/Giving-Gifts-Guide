import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GiftComponent } from './gift/gift.component';
import { CategorieComponent } from './categorie/categorie.component';
import { VoegGiftToeComponent } from './voeg-gift-toe/voeg-gift-toe.component';
import { GiftFilterPipe } from './gift-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    GiftComponent,
    CategorieComponent,
    VoegGiftToeComponent,
    GiftFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
