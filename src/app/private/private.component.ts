import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromAuthentication from './authentication/store/authentication.selector';
import * as AuthenticationActions from './authentication/store/authentication.actions';
import * as WidgetActions from './widget/store/widget.actions';
import * as fromWidgets from './widget/store/widget.selector';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IWidget } from '../shared/models';

@UntilDestroy()
@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent implements OnInit {
  isLoggedIn$ = this.store.pipe(select(fromAuthentication.getAccessToken));
  username$ = this.store.pipe(select(fromAuthentication.getUserName));
  selectedWidget$ = this.store.pipe(select(fromWidgets.getWidget));
  widgetKeys$ = this.store.pipe(select(fromWidgets.getWidgetsKeys));

  isEditing = false;
  widgetKey: string = '';

  constructor(private store: Store) {}

  ngOnInit() {
    this.selectedWidget$.pipe(untilDestroyed(this)).subscribe((widget) => {
      this.widgetKey = widget?.key ?? '';
    });
  }

  toggleEditing(isEditing: boolean, widgetKey?: string): void {
    this.isEditing = isEditing;
    this.widgetKey = isEditing ? widgetKey ?? '' : '';

    if (widgetKey) {
      this.store.dispatch(WidgetActions.loadWidget({ key: widgetKey }));
    }
  }
  logOut(): void {
    this.store.dispatch(AuthenticationActions.logOut());
  }

  updateWidget(widget: IWidget): void {
    if (this.widgetKey) {
      this.store.dispatch(WidgetActions.updateWidget({ widget }));
    } else {
      this.store.dispatch(WidgetActions.createWidget({ widget }));
    }
  }
}
