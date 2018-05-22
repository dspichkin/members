import { Component, OnInit, OnDestroy, Input } from '@angular/core';


@Component({
  selector: 'app-rating',
  templateUrl: 'rating.template.html',
  styleUrls: ['rating.component.scss']
})

export class RatingComponent implements OnInit, OnDestroy {
    @Input() friend = {
      id: null
    }

    stars = [];
    numberStars = 5;

    constructor() {
    }

    ngOnInit() {
      this.stars = Array.from(new Array(this.numberStars), () => {return {}});
      for (let i = 0; i <= this.friend.id; i++) {
        this.stars[i].active = true;
      }
    }


    ngOnDestroy() {
    }
   
}
