import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../models';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  @Output() toggleView = new EventEmitter<boolean>();
  @Output() logIn = new EventEmitter<IUser>();

  logInForm = this.createLogInForm();

  get controls(): Record<keyof IUser, FormControl> {
    return this.logInForm.controls as Record<keyof IUser, FormControl>;
  }

  onSubmit(): void {
    this.logIn.emit(this.logInForm.getRawValue());
  }

  private createLogInForm(): FormGroup {
    const controls: Record<keyof IUser, FormControl> = {
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      repeatPassword: new FormControl(null),
    };

    return new FormGroup(controls);
  }
}
