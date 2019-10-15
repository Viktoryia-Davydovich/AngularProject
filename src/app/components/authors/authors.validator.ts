import { AbstractControl } from "@angular/forms";

export function ValidateAuthorList(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value && control.value.length < 1) {
    return { invalidAuthorList: true };
  } else {
    return null;
  }
}
