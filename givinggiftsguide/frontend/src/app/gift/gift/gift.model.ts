import { Categorie } from '../categorie/categorie.model';

export class Gift {
  private _id: string;
  private _naam: string;
  private _beschrijving: string;
  private _prijs: number;
  private _categorieen: Categorie[];
  private _aanmaakdatum: Date;
  private _likes: string[];
  private _eigenaar: string;

  constructor(naam: string, beschrijving: string, prijs: number, eigenaar: string, categorieen: Categorie[] = [], aanmaakdatum: Date = null, likes: string[] = []) {
    this._naam = naam;
    this._beschrijving = beschrijving;
    this._prijs = prijs;
    this._categorieen = categorieen;
    this._eigenaar = eigenaar;
    this._aanmaakdatum = aanmaakdatum ? aanmaakdatum : new Date();
    this._likes = likes;
  }

  static fromJSON(json: any): Gift {
    const gift = new Gift(json.naam, json.beschrijving, json.prijs, json.eigenaar, json.categorieen, json.aanmaakdatum, json.likes);
    gift._id = json._id;
    return gift;
  }

  toJSON() {
    return {
      _id: this._id,
      naam: this._naam,
      beschrijving: this._beschrijving,
      prijs: this._prijs,
      eigenaar: this._eigenaar,
      categorieen: this._categorieen,
      aanmaakdatum: this._aanmaakdatum,
      likes: this._likes
    };
  }

  get id(): string {
    return this._id;
  }

  get naam(): string {
    return this._naam;
  }

  get beschrijving(): string {
    return this._beschrijving;
  }

  get prijs(): number {
    return this._prijs;
  }

  get eigenaar(): string {
    return this._eigenaar;
  }

  get categorieen(): Categorie[] {
    return this._categorieen;
  }

  get aanmaakdatum(): Date {
    return this._aanmaakdatum;
  }

  get likes(): string[] {
    return this._likes;
  }

  likeGift(naam: string) {
    this._likes.push(naam);
  }

  unlikeGift(naam: string) {
    let index = this._likes.findIndex(like => like === naam);
    this._likes.splice(index, 1);
  }

  lietLikeAchter(naam: string): boolean {
    return this._likes.includes(naam);
  }

  voegCategorieToe(cat: Categorie) {
    this._categorieen.push(cat);
  }

}