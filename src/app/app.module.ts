
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './fake-backend.service';

import { appRoutingModule } from '../app/app-routing.module';

// import { AlertComponent } from './';
import { AuthGuard } from '../app/auth-guard.service';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { ErrorInterceptor } from './error-interceptor.service';
import { AlertService } from './alert.service';
import { AuthServiceService } from './auth-service.service';
import { UserService } from './user.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { from } from 'rxjs';
import { AlertComponent } from './alert/alert.component';
import { AjoutUserComponent } from './ajout-user/ajout-user.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule
    ],
    declarations: [
        AppComponent,

        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        AjoutUserComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthServiceService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }