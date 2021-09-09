import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  checkDuplicateUsername(control: AbstractControl): ValidationErrors | null {
    let users = sessionStorage.getItem("users");
    let usersList = users ? JSON.parse(users) : [];
    const user = usersList?.find((u) => {
      return u.username === control.value;
    });

    return user ? { duplicate: true } : null;
  }

  passwordPatternValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value?.length === 0) {
      return null;
    }
    if (control.value?.length < 6) {
      return { short: true };
    } else if (control.value?.length > 50) {
      return { long: true };
    } else if (control.value?.search(/\d/) === -1) {
      return { number: true };
    } else if (control.value?.search(/[a-zA-Z]/) === -1) {
      return { letter: true };
    } else if (control.value?.search(/[!@#$%&()_=<>?^*-]/) === -1) {
      return { specialChar: true };
    }
    return null;
  }

  confirmPasswordValidator(pControl: AbstractControl, cpControl: AbstractControl): ValidationErrors | null {
    return cpControl?.value !== pControl?.value ? { misMatch: true } : null;
  }
}
