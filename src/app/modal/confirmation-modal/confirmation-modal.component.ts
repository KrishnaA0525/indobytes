import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'unsta-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public modalData: any, private matDialogRef: MatDialogRef<ConfirmationModalComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.matDialogRef.close();
  }

  redirect() {
    this.modalData.redirect();
    this.close();
  }

}
