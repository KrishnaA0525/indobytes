import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { InformationModalComponent } from '../modal/information-modal/information-modal.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'unsta-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError: string = "";

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    sessionStorage.removeItem("user");
  }

  submitLogin(loginData: NgForm): void {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((params: Params) => {
      if (params["u"] === "user") {
        let user = this.userService.checkUserLogin(loginData.value);
        if (user) {
          this.loginError = "";
          if (user.active) {
            this.router.navigate(["userDashboard"]);
          } else {
            sessionStorage.removeItem("user");
            this.matDialog.open(InformationModalComponent, {
              data: {
                message: "Your account has been deactivated by Admin."
              },
              width: "500px",
              disableClose: true
            });
          }                  
        } else {
          this.loginError = "Invalid credentials!"
        }
      } else if (params["u"] === "admin") {
        this.router.navigate(["adminDashboard"]);
      }
    });
  }

  openResetPasswordWindow() {
    this.matDialog.open(ResetPasswordComponent, {
      data: {},
      width: "500px",
      disableClose: true
    });
  }
}
