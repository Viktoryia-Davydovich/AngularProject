import { AbstractControl } from "@angular/forms";

export function ValidateAuthorList(control: AbstractControl) {
  if (control.value.length >= 1) {
    return { validAuthorList: true };
  }
  return null;
}
