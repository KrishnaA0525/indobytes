import { Component, OnInit } from '@angular/core';
import { RouterLinkRendererComponent } from '../router-link-renderer/router-link-renderer.component';

@Component({
  selector: 'unsta-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public users: any[] = [];
  defaulfColDefs: any = {
    resizable: true,
    wrapText: true,
    sortable: true,
    filter: true
  };
  columnDefs = [
    { field: "id", headerName: "Sl No" },
    {
      field: "name", headerName: "Name"
    },
    { field: "username", headerName: "Username" },
    { field: "email", headerName: "Email" },
    { field: "active", width: 300, headerName: "Edit/Activate/Deactivate/Delete", cellRendererFramework: RouterLinkRendererComponent }
  ];

  constructor() { }

  ngOnInit(): void {
    const users = sessionStorage.getItem("users");
    let allUsers = users ? JSON.parse(users) : [];
    this.createGridData(allUsers);
  }

  createGridData(users: any[]) {
    this.users = users.map((user, i) => {
      return {
        id: i,
        name: user.name,
        email: user.email,
        username: user.username,
        active: user.active
      };
    });
  }
}
