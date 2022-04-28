import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { WidgetModule } from './public-widget/widget.module';

@NgModule({
  declarations: [PublicComponent],
  imports: [CommonModule, WidgetModule],
})
export class PublicModule {}
