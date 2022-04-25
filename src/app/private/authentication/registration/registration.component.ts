import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from 'src/app/shared/validators/match.validator';
import { IUser } from '../models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  @Input() isLoading: boolean | null | undefined;
  @Output() toggleView = new EventEmitter<boolean>();
  @Output() register = new EventEmitter<IUser>();

  registrationForm = this.createRegistrationForm();

  get controls(): Record<keyof IUser, FormControl> {
    return this.registrationForm.controls as Record<keyof IUser, FormControl>;
  }

  get repeatPasswordNoMatch(): boolean {
    return !!this.registrationForm.errors?.mustMatch;
  }

  onSubmit(): void {
    this.register.emit(this.registrationForm.getRawValue());
  }

  private createRegistrationForm(): FormGroup {
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
