import { UntypedFormGroup, ValidatorFn } from "@angular/forms";

// custom validator to check that two fields match
export function MustMatch(
  controlName: string,
  matchingControlName: string,
): ValidatorFn {
  return (formGroup: UntypedFormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return matchingControl.errors;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      return { mustMatch: true };
    } else {
      return null;
    }
  };
}
