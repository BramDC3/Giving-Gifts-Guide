import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GiftComponent } from './gift/gift.component';
import { CategorieComponent } from './categorie/categorie.component';
import { VoegGiftToeComponent } from './voeg-gift-toe/voeg-gift-toe.component';
import { GiftFilterPipe } from './gift-filter.pipe';
import { GiftListComponent } from './gift-list/gift-list.component';

const appRoutes: Routes = [
  { path: 'gift-list', component: GiftListComponent },
  { path: 'voeg-gift-toe', component: VoegGiftToeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GiftComponent,
    CategorieComponent,
    VoegGiftToeComponent,
    GiftFilterPipe,
    GiftListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
