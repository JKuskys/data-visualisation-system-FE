import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './authentication/authentication.module';

@NgModule({
  declarations: [
    PrivateComponent,
  ],
  imports: [
    AuthenticationModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    // StoreModule.forFeature('authentication', reducer),
    // EffectsModule.forFeature([AuthenticationEffects]),
  ],
})
export class PrivateModule {}
