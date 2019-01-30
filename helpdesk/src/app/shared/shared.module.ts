import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modals/modal-delete/modal.component';
import { ModalRedirectComponent } from './modals/modal-redirect/modal-redirect.component';
import { ModalChangeStatusComponent } from './modals/modal-change-status/modal-change-status.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    ModalComponent,
    ModalRedirectComponent,
    ModalChangeStatusComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule

  ],
  exports:[
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HttpClientModule,
    ReactiveFormsModule,
    ModalComponent,
    ModalRedirectComponent,
    ModalChangeStatusComponent,
    RouterModule
  ]
})
export class SharedModule { }
