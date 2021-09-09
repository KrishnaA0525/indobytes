import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm!: FormGroup;
  hobbies: string[] = ["Cricket", "Movies", "Web series", "News", "Chess"];
  constructor(private formBuilder: FormBuilder, private valSer: ValidationService, private matDialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      "name": ["a", Validators.required],
      email: ["aa@b.com11", [Validators.required, Validators.email]],
      username: ["a", [Validators.required, this.checkDuplicateUsername.bind(this)]],
      password: ["aA1aaaaa!", [Validators.required, this.passwordPatternValidator.bind(this)]],
      confirmPassword: ["aA1aaaaa!", [Validators.required, this.confirmPasswordValidator.bind(this)]],
      profilePic: [null],
      gender: ["male"],
      education: [null],
      hobbies: this.formBuilder.array(this.hobbies.map((x) => false))
    });
  }

  onSignupSubmit() {
    let users = sessionStorage.getItem("users");
    let usersList = users ? JSON.parse(users) : [];
    this.signupForm.value.hobbies = this.getHobbyValues();
    let user = this.signupForm.value;
    user.id = usersList.length + "";
    user.active = true;
    usersList.push(user)
    sessionStorage.setItem("users", JSON.stringify(usersList));
    this.matDialog.open(NotificationComponent, {
      data: {
        message: "User created with ID: " + user.id
      },
      width: "250px",
      height: "100px"
    });
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["signup"]));
  }

  checkDuplicateUsername(control: AbstractControl): ValidationErrors | null {    
    return this.valSer.checkDuplicateUsername(control);
  }

  passwordPatternValidator(control: AbstractControl): ValidationErrors | null {
    return this.valSer.passwordPatternValidator(control);
  }

  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    return this.valSer.confirmPasswordValidator(this.signupForm?.get("password"), control);
  }

  getHobbyValues() {
    return this.hobbies.filter((h, i) => {
      return this.signupForm.value.hobbies[i];
    });
  }

}
