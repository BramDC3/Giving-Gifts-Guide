import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Gift } from "./gift.model";
import { GiftDataService } from "../gift-data.service";
import { Observable } from "rxjs/Observable";


@Injectable()
export class GiftResolver implements Resolve<Gift> {
    constructor(private _giftDataService: GiftDataService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Gift> {
        return this._giftDataService.getGift(route.params['id'])
    }
}