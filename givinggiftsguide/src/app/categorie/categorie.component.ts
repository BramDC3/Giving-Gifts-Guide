import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  @Input() naam: string;

  constructor() { }

  ngOnInit() {
  }

}
