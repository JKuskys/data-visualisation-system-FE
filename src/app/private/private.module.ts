import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './authentication/authentication.module';
import { WidgetModule } from './widget/widget.module';
import { reducer } from './widget/store/widget.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WidgetsEffects } from './widget/store/widget.effect';

@NgModule({
  declarations: [PrivateComponent],
  imports: [
    AuthenticationModule,
    WidgetModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('privateWidgets', reducer),
    EffectsModule.forFeature([WidgetsEffects]),
  ],
})
export class PrivateModule {}
