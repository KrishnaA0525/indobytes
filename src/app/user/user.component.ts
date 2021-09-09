import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'unsta-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user;

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    const userData = sessionStorage.getItem("user");
    this.user = userData ? JSON.parse(userData) : {};
  }

  openResetPasswordWindow() {
    this.matDialog.open(ResetPasswordComponent, {
      data: {},
      width: "500px",
      disableClose: true
    });
  }

}
