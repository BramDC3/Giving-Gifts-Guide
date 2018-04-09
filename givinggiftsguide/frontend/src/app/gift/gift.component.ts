import { Component, OnInit, Input } from '@angular/core';
import { Gift } from './gift.model'

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {
  @Input() public gift: Gift;

  constructor() {
  }

  ngOnInit() {
  }

}
