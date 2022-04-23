import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LogInComponent } from './authentication/log-in/log-in.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/authentication.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from './store/authentication.effect';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PrivateComponent,
    AuthenticationComponent,
    LogInComponent,
    RegistrationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('authentication', reducer),
    EffectsModule.forFeature([AuthenticationEffects]),
  ],
})
export class PrivateModule {}
