import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WidgetDashboardComponent } from './widget-dashboard/widget-dashboard.component';
import { EditWidgetComponent } from './edit-widget/edit-widget.component';

import { reducer } from './store/widget.reducer';
import { WidgetsEffects } from './store/widget.effect';

@NgModule({
  declarations: [WidgetDashboardComponent, EditWidgetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('privateWidgets', reducer),
    EffectsModule.forFeature([WidgetsEffects]),
  ],
  exports: [WidgetDashboardComponent, EditWidgetComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WidgetModule {}
