import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'unsta-information-modal',
  templateUrl: './information-modal.component.html',
  styleUrls: ['./information-modal.component.css']
})
export class InformationModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public modalData: any, private matDialogRef: MatDialogRef<InformationModalComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.matDialogRef.close();
  }

}
