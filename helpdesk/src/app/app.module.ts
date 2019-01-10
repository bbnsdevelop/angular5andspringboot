import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';
//import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './security/auth.interceptor';
import { AppRoutingModule } from './app.routing.module';
import { UsersModule } from './users/users.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    UsersModule
  ],
  providers: [
      {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
