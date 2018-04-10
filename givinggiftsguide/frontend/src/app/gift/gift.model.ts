import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class Gift {
  private _naam: string;
  private _beschrijving: string;
  private _prijs: number;
  private _categorieen: string[];
  private _aanmaakdatum: Date = new Date();
  private _likes: number = 0;

  constructor(naam: string, beschrijving: string, prijs: number) {
    this._naam = naam;
    this._beschrijving = beschrijving;
    this._prijs = prijs;
  }

  ngOnInit() {
  }

  toJSON() {
    return {
      naam: this._naam,
      beschrijving: this._beschrijving,
      prijs: this._prijs
    };
  }

  get naam(): string {
    return this._naam;
  }

  voegCategorieToe(naam: string, soort?: string) {
    this._categorieen.push(`${soort || "normaal"} ${naam}`);
  }

}