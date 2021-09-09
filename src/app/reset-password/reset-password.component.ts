import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InformationModalComponent } from '../modal/information-modal/information-modal.component';
import { ValidationService } from '../services/validation.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'unsta-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private valSer: ValidationService, private matDialogRef: MatDialogRef<ResetPasswordComponent>, private userService: UserService, private router: Router, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      username: [null, [Validators.required, this.checkDuplicateUsername.bind(this)]],
      password: [null, [Validators.required, this.passwordPatternValidator.bind(this)]],
      confirmPassword: [null, [Validators.required, this.confirmPasswordValidator.bind(this)]]
    });
  }

  resetPassword() {
    const user = this.userService.getUserWIthUsername(this.resetPasswordForm.value?.username);
    if (user.active) {
      this.userService.updateUser(this.resetPasswordForm.value);
      if (sessionStorage.getItem("user")) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(["userDashboard"]));
      } else {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(["login"], {queryParams: { u: "user" }}));
      }      
    } else {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(["login"], {queryParams: { u: "user" }}));
      this.matDialog.open(InformationModalComponent, {
        data: {
          message: "Your account has been deactivated by Admin, and you cannot reset the password."
        },
        width: "500px",
        disableClose: true
      });
    }
    
            
    this.close()
  }

  checkDuplicateUsername(control: AbstractControl): ValidationErrors | null {    
    if (this.valSer.checkDuplicateUsername(control)) {
      return null;
    } else {
      return { noUsername: true };
    }
  }

  passwordPatternValidator(control: AbstractControl): ValidationErrors | null {
    return this.valSer.passwordPatternValidator(control);
  }

  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    return this.valSer.confirmPasswordValidator(this.resetPasswordForm?.get("password"), control);
  }

  close() {
    this.matDialogRef.close();
  }

}
