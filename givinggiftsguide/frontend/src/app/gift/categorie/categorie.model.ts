export enum Soort {
    Normaal,
    Speciaal,
    Feestdag
}

export class Categorie {
    private _id: string;
    private _naam: string;
    private _soort: Soort;

    static fromJSON(json): Categorie {
        const cat = new Categorie(json.naam, json.soort);
        cat._id = json._id;
        return cat;
    }

    constructor(naam: string, soort: Soort = Soort.Normaal) {
        this._naam = naam;
        this._soort = soort;
    }

    get id(): string {
        return this._id;
    }

    get naam(): string {
        return this._naam;
    }

    set naam(naam: string) {
        this._naam = naam;
    }

    get soort(): Soort {
        return this._soort;
    }

    set soort(soort: Soort) {
        this._soort = soort;
    }

    toJSON() {
        return {
            _id: this._id,
            naam: this._naam,
            soort: this._soort
        };
    }
}