import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Gift } from '../gift/gift.model';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Categorie } from '../categorie/categorie.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { GiftDataService } from '../gift-data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-voeg-gift-toe',
  templateUrl: './voeg-gift-toe.component.html',
  styleUrls: ['./voeg-gift-toe.component.css']
})
export class VoegGiftToeComponent implements OnInit {
  public readonly soortTypes = ['Normaal', 'Promotie', 'Feestdag'];
  public readonly categorieLijst = ['Normaal', 'Promotie', 'Feestdag'];
  @Output() public nieuweGift = new EventEmitter<Gift>();
  private gift: FormGroup;
  errorMsg: string;

  constructor(private fb: FormBuilder, private _giftDataService: GiftDataService) { }

  get categorieen(): FormArray {
    return <FormArray>this.gift.get('categorieen');
  }

  ngOnInit() {
    this.gift = this.fb.group({
      naam: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      beschrijving: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      prijs: ['', [Validators.required, Validators.min(1), Validators.max(9999)]],
      categorieen: this.fb.array([this.maakCategorieen()])
    });

    this.categorieen.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(catList => {
        const lastElement = catList[catList.length - 1];
        if (lastElement.categorienaam &&
          lastElement.categorienaam.length > 2) {
          this.categorieen.push(this.maakCategorieen());
        } else if (catList.length >= 2) {
          const secondToLast = catList[catList.length - 2];
          if (
            !lastElement.categorienaam &&
            (!secondToLast.categorienaam ||
              secondToLast.categorienaam.length < 2)
          ) {
            this.categorieen.removeAt(this.categorieen.length - 1);
          }
        }
      });
  }

  maakCategorieen(): FormGroup {
    return this.fb.group({
      categorienaam: ['', [Validators.required, Validators.minLength(3)]],
      soort: ['Normaal']
    })
  }

  onSubmit() {
    if (this.gift.value.naam != null && this.gift.value.naam != "" && this.gift.value.beschrijving != null && this.gift.value.beschrijving != "" && this.gift.value.prijs != null && this.gift.value.prijs != "" &&
        this.gift.value.naam.length >= 3 && this.gift.value.naam.length <= 50 && this.gift.value.beschrijving.length >= 10 && this.gift.value.beschrijving.length <= 500 && this.gift.value.prijs >= 1 && this.gift.value.prijs <= 9999) {
      const gift = new Gift(this.gift.value.naam, this.gift.value.beschrijving, this.gift.value.prijs);
      for (const cat of this.gift.value.categorieen) {
        if (cat.categorienaam.length > 2) {
          gift.voegCategorieToe(new Categorie(cat.categorienaam, cat.soort));
        }
      }
      this._giftDataService.voegNieuweGiftToe(gift).subscribe(
        item => { },
        (error: HttpErrorResponse) => {
          this.errorMsg = `Er is een fout opgetreden bij het toevoegen van de gift ${gift.naam}`;
        }
      );
    }
  }
}
