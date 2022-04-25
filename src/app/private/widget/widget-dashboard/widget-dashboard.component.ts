import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as WidgetActions from '../store/widget.actions';

@Component({
  selector: 'app-widget-dashboard',
  templateUrl: './widget-dashboard.component.html',
  styleUrls: ['./widget-dashboard.component.scss']
})
export class WidgetDashboardComponent implements OnInit {
  @Input() widgetKeys: string[] | null = []
  @Output() logOut = new EventEmitter<void>();
  @Output() startEdit = new EventEmitter<string>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(WidgetActions.loadPrivateWidgets())
  }

}
