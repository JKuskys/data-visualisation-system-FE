import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './authentication/authentication.module';
import { WidgetModule } from './widget/widget.module';

@NgModule({
  declarations: [PrivateComponent],
  imports: [
    AuthenticationModule,
    WidgetModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class PrivateModule {}
