import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from 'src/app/shared/validators/match.validator';
import { IUser } from '../models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  @Output() toggleView = new EventEmitter<boolean>();
  @Output() register = new EventEmitter<IUser>();

  registrationForm = this.createLogInForm();

  get controls(): Record<keyof IUser, FormControl> {
    return this.registrationForm.controls as Record<keyof IUser, FormControl>;
  }

  get repeatPasswordNoMatch(): boolean {
    console.log(this.registrationForm)
    return !!this.registrationForm.errors?.mustMatch;
  } 

  onSubmit(): void {
    this.register.emit(this.registrationForm.getRawValue());
  }

  private createLogInForm(): FormGroup {
    const controls: Record<keyof IUser, FormControl> = {
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      repeatPassword: new FormControl(null, Validators.required),
    };

    return new FormGroup(
      controls,
      matchValidator('password', 'repeatPassword')
    );
  }
}
