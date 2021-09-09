import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'unsta-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [],
      name: [],
      username: [],
      email: []
    });
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const userId = params['id'];
        const users = sessionStorage.getItem("users");
        const user = users ? JSON.parse(users).find(
          (user) => {
            return +userId === +user.id;
          }
        ) : {};
        this.userForm.setValue({
          id: user?.id,
          name: user?.name,
          username: user?.username,
          email: user?.email
        });
      }
    );
  }

  updateUser() {
    const user = {
      id: this.userForm.value.id,
      email: this.userForm.value.email,
      name: this.userForm.value.name,
      username: this.userForm.value.username
    }
    this.userService.updateUser(user);
    this.router.navigate(["/adminDashboard"]);
  }

  cancel(): void {
    this.router.navigate(["/adminDashboard"]);
  }

}
