import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PublicWidgetActions from '../store/widget.actions';

@Component({
  selector: 'app-public-widget-dashboard',
  templateUrl: './public-widget-dashboard.component.html',
  styleUrls: ['./public-widget-dashboard.component.scss']
})
export class PublicWidgetDashboardComponent implements OnInit {
  @Input() widgetKeys: string[] | null = []
  @Output() onView = new EventEmitter<string>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(PublicWidgetActions.loadWidgets())
  }

}
