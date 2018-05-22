import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';

import { MembersComponent} from './members/members.component';
import { NavComponent} from './nav/nav.component';
import { FooterComponent} from './footer/footer.component';
import { RatingComponent} from './rating/rating.component';
import { InfiniteScrollerDirective } from '../directives/scroll.directive';

@NgModule({
  declarations: [
    MembersComponent,
    NavComponent,
    FooterComponent,
    RatingComponent,
    InfiniteScrollerDirective
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    MembersComponent,
    NavComponent,
    FooterComponent,
    RatingComponent
  ],
})

export class ComponentModule {
}
