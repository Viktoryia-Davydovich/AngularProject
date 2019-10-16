import { AbstractControl } from "@angular/forms";

export function ValidateAuthorList(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (control.value && control.value.length < 1) {
    console.log("True");
    return { invalidAuthorList: true };
  } else {
    return null;
  }
}
