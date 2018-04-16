import { GiftComponent } from "./gift/gift.component";
import { CategorieComponent } from "./categorie/categorie.component";
import { VoegGiftToeComponent } from "./voeg-gift-toe/voeg-gift-toe.component";
import { GiftFilterPipe } from "./gift-filter.pipe";
import { GiftListComponent } from "./gift-list/gift-list.component";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { GiftDataService } from "./gift-data.service";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { GiftDetailComponent } from './gift-detail/gift-detail.component';
import { GiftResolver } from "./gift/gift-resolver";

const routes: Routes = [
    { path: 'list', component: GiftListComponent },
    { path: 'toevoegen', component: VoegGiftToeComponent },
    { path: ':id', component: GiftDetailComponent, resolve: { gift: GiftResolver } }
  ];

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        GiftComponent,
        CategorieComponent,
        VoegGiftToeComponent,
        GiftFilterPipe,
        GiftListComponent,
        GiftDetailComponent
    ],
    providers: [ GiftDataService, GiftResolver ]
})
export class GiftModule { }