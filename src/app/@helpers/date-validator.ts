import {AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

export function dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const now = new Date()
        const testedDate = new Date(control.value)
        if (now > testedDate) {
            return {
                date: control.value
            }
        }
        return null
    };
  }