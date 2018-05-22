import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';


import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { catchError } from "rxjs/internal/operators";
import { of } from "rxjs";

import { Member } from '../../models/member';
import { MembersService } from '../../services/members.service';
import { AppSettings } from '../../app.settings';

@Component({
  selector: 'app-members',
  templateUrl: 'members.template.html',
  styleUrls: ['members.component.scss']
})

export class MembersComponent implements AfterViewInit, OnInit, OnDestroy {

    loading = false;
    members$: Observable<any[]>;
    favoriteMemebers: Member[] = [];
    private searchTerms$: Subject<any> = new Subject<any>();
    loadingScroll = false;

    constructor(private membersService: MembersService) {
    }

    ngOnInit() {
      this.members$ = this.membersService.getMembers();
      this.favoriteMemebers = this.membersService.getFavoriteMember();
    }

    searchMembers(query) {
      this.members$ = this.membersService.getMembers(query).pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(members => {
          return members.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
        }),
        catchError(error => of(null))
      )
    }

    ngAfterViewInit(): void {
      this.onSearch('');
    }

    errorHandler(error) {
      return of<any[]>([]);
    }

    onSearch(term: string): void {
      this.searchTerms$.next(term);
    }
    
    makeFavorite(member) {
      if (this.favoriteMemebers.find(i => i._id == member._id)) {
        return;
      }
      this.favoriteMemebers.push(member);
      this.membersService.saveFavoriteMember(this.favoriteMemebers)
    }

    removeFavorite(member) {
      const index = this.favoriteMemebers.findIndex(i => i._id == member._id);
      if (index > -1) {
        this.favoriteMemebers.splice(index, 1);
      }
      this.membersService.saveFavoriteMember(this.favoriteMemebers)
    }

    sortFavorite(order) {
      this.members$ = this.members$.pipe(
        map(members => {
          if (order) {
            return members.sort((x,y) => x.name < y.name ? -1 : 1)
          } else {
            return members.sort((x,y) => x.name > y.name ? -1 : 1)
          }
        }),
        catchError(error => of(null))
      )
    }

    scrollHandler($event) {
      if ($event.position === 'bottom' && !this.loadingScroll) {
        this.loadingScroll = true 
        this.members$.subscribe(result => {
          this.members$ = this.membersService.getMembers(null, result.length);
          $event.el.nativeElement.scrollTop = $event.el.nativeElement.scrollHeight;
          setTimeout(() => {
            this.loadingScroll = false;
          }, 4000)
        })
      }
    }
    
    ngOnDestroy() {
    }
   
}
