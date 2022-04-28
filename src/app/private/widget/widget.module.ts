import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WidgetDashboardComponent } from './widget-dashboard/widget-dashboard.component';
import { EditWidgetComponent } from './edit-widget/edit-widget/edit-widget.component';

@NgModule({
  declarations: [WidgetDashboardComponent, EditWidgetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    // StoreModule.forFeature('authentication', reducer),
    // EffectsModule.forFeature([AuthenticationEffects]),
  ],
  exports: [WidgetDashboardComponent, EditWidgetComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WidgetModule {}
