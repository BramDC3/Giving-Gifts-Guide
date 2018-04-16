import { Component, OnInit , Input} from '@angular/core';
import { Categorie } from './categorie.model';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  @Input() public categorie: Categorie;

  constructor() {}

  ngOnInit() {}
}
