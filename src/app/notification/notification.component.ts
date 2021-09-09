import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'unsta-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NotificationComponent>, @Inject(MAT_DIALOG_DATA) public modalData: any) { }

  ngOnInit(): void {
    this.dialogRef.updatePosition({
      top: `10px`
    });
  }

}
