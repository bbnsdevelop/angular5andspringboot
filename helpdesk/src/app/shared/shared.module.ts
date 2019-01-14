import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    ModalComponent
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
    RouterModule
  ]
})
export class SharedModule { }
