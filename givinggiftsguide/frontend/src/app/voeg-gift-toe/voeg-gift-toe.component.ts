import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Gift } from '../gift/gift.model';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Categorie } from '../categorie/categorie.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-voeg-gift-toe',
  templateUrl: './voeg-gift-toe.component.html',
  styleUrls: ['./voeg-gift-toe.component.css']
})
export class VoegGiftToeComponent implements OnInit {
  public readonly soortTypes = ['Normaal', 'Speciaal', 'Feestdag'];
  @Output() public nieuweGift = new EventEmitter<Gift>();
  private gift: FormGroup;

  constructor(private fb: FormBuilder) { }

  get categorieen(): FormArray {
    return <FormArray>this.gift.get('categorieen');
  }

  ngOnInit() {
    this.gift = this.fb.group({
      naam: ['Naam van de gift', [Validators.required, Validators.minLength(3)]],
      beschrijving: ['Beschrijving van de gift', [Validators.required, Validators.minLength(10)]],
      prijs: [123, [Validators.required, Validators.min(1), Validators.max(5000)]],
      categorieen: this.fb.array([ this.maakCategorieen() ])
    });

    this.categorieen.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(catList => {
        const lastElement = catList[catList.length - 1];
        if ( lastElement.categorienaam &&
          lastElement.categorienaam.length > 2 ) 
          { this.categorieen.push(this.maakCategorieen()); }
      });
  }

  maakCategorieen(): FormGroup {
    return this.fb.group({
      categorienaam: ['', [Validators.required, Validators.minLength(3)]],
      soort: ['Normaal']
    })
  }

  onSubmit() {
    const gift = new Gift(this.gift.value.naam, this.gift.value.beschrijving, this.gift.value.prijs);
    for (const cat of this.gift.value.categorieen) {
      if (cat.categorienaam.length > 2) {
        gift.voegCategorieToe(new Categorie(cat.categorienaam, cat.soort));
      }
    }
    this.nieuweGift.emit(gift);
  }
}
