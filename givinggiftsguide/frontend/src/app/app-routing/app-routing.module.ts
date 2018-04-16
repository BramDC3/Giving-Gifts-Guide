import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { SelectivePreloadStrategy } from './SelectivePreloadStrategy';

const appRoutes: Routes = [
  {
    path: 'gift',
    loadChildren: 'app/gift/gift.module#GiftModule',
    data: { preload: true }
  },
  { path: '', redirectTo: 'gift/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: SelectivePreloadStrategy
    })
  ],
  providers: [SelectivePreloadStrategy],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
