import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PublicWidgetDashboardComponent } from './widget-dashboard/public-widget-dashboard.component';
import { PublicWidgetViewComponent } from './public-widget-view/public-widget-view.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/widget.reducer';
import { PublicWidgetsEffects } from './store/widget.effect';

@NgModule({
  declarations: [PublicWidgetDashboardComponent, PublicWidgetViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('publicWidgets', reducer),
    EffectsModule.forFeature([PublicWidgetsEffects]),
  ],
  exports: [PublicWidgetDashboardComponent, PublicWidgetViewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WidgetModule {}
