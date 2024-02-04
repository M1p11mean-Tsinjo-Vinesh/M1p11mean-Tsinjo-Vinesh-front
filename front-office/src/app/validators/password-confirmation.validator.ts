import {AbstractControl, ValidationErrors} from "@angular/forms";

export function passwordConfirmationValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (!confirmPassword.value) {
    return null;
  }
  if ( password && confirmPassword && (password.value !== confirmPassword.value)) {
    return {passwordConfirmation: true};
  }
  return null;
}