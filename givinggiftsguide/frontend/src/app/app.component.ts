import { Component } from '@angular/core';
import { Gift } from './gift/gift.model';
import { GiftDataService } from './gift-data.service';
import { Subject } from 'rxjs/Subject';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GiftDataService]
})

export class AppComponent {}