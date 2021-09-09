import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { AgGridModule } from 'ag-grid-angular';
import { RouterLinkRendererComponent } from './router-link-renderer/router-link-renderer.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ConfirmationModalComponent } from './modal/confirmation-modal/confirmation-modal.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { InformationModalComponent } from './modal/information-modal/information-modal.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    UserComponent,
    AdminComponent,
    RouterLinkRendererComponent,
    EditUserComponent,
    ConfirmationModalComponent,
    ResetPasswordComponent,
    InformationModalComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([RouterLinkRendererComponent]),
    MatDialogModule,
    MatIconModule,
    
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
