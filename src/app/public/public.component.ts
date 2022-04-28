import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as WidgetActions from './public-widget/store/widget.actions';
import * as fromPublicWidgets from './public-widget/store/widget.selector';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IWidget } from '../shared/models';

@UntilDestroy()
@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  selectedWidget$ = this.store.pipe(select(fromPublicWidgets.getWidget));
  widgetKeys$ = this.store.pipe(select(fromPublicWidgets.getWidgetsKeys));

  isViewing = false;
  widgetKey: string = '';

  constructor(private store: Store) {}

  ngOnInit() {
    this.selectedWidget$.pipe(untilDestroyed(this)).subscribe((widget) => {
      this.widgetKey = widget?.key ?? '';
    });
  }

  toggleIsViewing(isViewing: boolean, widgetKey?: string): void {
    this.isViewing = isViewing;
    this.widgetKey = isViewing ? widgetKey ?? '' : '';

    if (widgetKey) {
      this.store.dispatch(WidgetActions.loadWidget({ key: widgetKey }));
    }
  }
}
