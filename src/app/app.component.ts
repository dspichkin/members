import { Component } from '@angular/core';

import { AppSettings } from './app.settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public ngOnInit():any {
    AppSettings.initialized();
  }
}
