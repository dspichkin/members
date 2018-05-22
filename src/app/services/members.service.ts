import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';


import { AppSettings } from '../app.settings';
import { Member } from '../models/member';

@Injectable()
export class MembersService {
    private _members: BehaviorSubject<Member[]>; 
    private _favoriteMemebers: Member[] = []; 


    constructor(private httpClient: HttpClient) {
      this._members = <BehaviorSubject<Member[]>>new BehaviorSubject([]);
      this.getFavoriteMember();
    }

    getMembers(query?, _limit?): Observable<any> {
        let url = AppSettings.URL_MEMBERS;
        let data = {};
        if (query) {
            data['query'] = query;
        }
        let params: HttpParams = new HttpParams();
        for (let key in data) {
            params = params.set(key, data[key]);
        }
        let limit = _limit || 2;
        limit += limit;
        return this.httpClient.get(url, {params}).pipe(
          map((members: any) => {
            return members.splice(0, limit);
          })
        )
    }

    saveFavoriteMember(members: Member[]) {
      this._favoriteMemebers = members || [];
      window.localStorage['favoriteMemebers'] = JSON.stringify(this._favoriteMemebers);
    }

    getFavoriteMember() {
      const list = window.localStorage['favoriteMemebers'] || '[]';
      this._favoriteMemebers = JSON.parse(list);
      return this._favoriteMemebers;
    }

}

