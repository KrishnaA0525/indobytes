import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgRendererComponent } from 'ag-grid-angular';
import { ConfirmationModalComponent } from '../modal/confirmation-modal/confirmation-modal.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'unsta-router-link-renderer',
  template: `<a href="#" class="btn btn-sm btn-primary mr-2" routerLink="../edit/{{params.data.id}}">Edit</a>
              <button type="button" class="btn btn-sm btn-warning mr-2" (click)="onActivateOrDeactivate(params.data)">{{ params.data.active ? 'Deactivate' : 'Activate'}}</button>
              <button type="button" class="btn btn-sm btn-danger" (click)="onDeleteUser(params.data.username)">Delete</button>
            `,
  styleUrls: ['./router-link-renderer.component.css']
})
export class RouterLinkRendererComponent implements OnInit, AgRendererComponent {

  params: any;

  constructor(private userService: UserService, private router: Router, private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  onActivateOrDeactivate(user) {
    user.active = !user.active;
    this.userService.updateUser(user);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["adminDashboard"]));
  }

  onDeleteUser(username: string) {
    this.matDialog.open(ConfirmationModalComponent, {
      data: {
        message: "Do you want to Delete?",
        redirect: () => {
          this.userService.deleteUser(username);
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["adminDashboard"]));
        }
      },
      width: "500px",
      disableClose: true
    });
  }

}
