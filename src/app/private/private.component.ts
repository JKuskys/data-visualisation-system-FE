import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromAuthentication from './authentication/store/authentication.selector';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {
  isLoggedIn$ = this.store.pipe(select(fromAuthentication.getAccessToken));

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
