import {
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";

//allow letters, numbers, and underscores
const illegalChars = /^[0-9A-Za-z_.-]+$/;

//custom validator to check that two fields match
export function ValidateUsername(username_control_name: string): ValidatorFn {
  return (formGroup: UntypedFormGroup) => {
    const username = formGroup.controls[username_control_name];

    // return if another validator has already found an error on the username
    if (
      username.errors &&
      !username.errors.emptyUsername &&
      !username.errors.wrongLength &&
      !username.errors.illegalChars
    )
      return;

    // set error on matchingControl if validation fails
    if (username.value == "") {
      return { emptyUsername: true };
    } else if (username.value.length < 1 || username.value.length > 35) {
      return { wrongLength: true };
    } else if (!illegalChars.test(username.value)) {
      return { illegalChars: true };
    } else {
      return null;
    }
  };
}
