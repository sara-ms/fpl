import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {JwtInterceptorService} from '../jwt-interceptor.service';
import { AlertService} from '../alert.service';
import {AuthServiceService} from '../auth-service.service';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthServiceService,
        private alertService: AlertService,
        private tokenService: JwtInterceptorService, {
            
        }) {}

    ngOnInit() {

       
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        if (this.tokenService.getToken()) {
            this.loading = true;
            
          }

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    // onSubmit() {
    //     this.submitted = true;

    //     // stop here if form is invalid
    //     if (this.loginForm.invalid) {
    //         return;
    //     }

    //     this.loading = true;
    //     this.authenticationService.login(this.f.username.value, this.f.password.value)
    //         .pipe(first())
    //         .subscribe(
    //             data => {
    //                 this.router.navigate([this.returnUrl]);
    //             },
    //             error => {
    //                 this.alertService.error(error);
    //                 this.loading = false;
    //             });
    // }
    onSubmit() {
        this.authenticationService.login(this.loginForm.value).subscribe(
          data => {
            this.tokenService.saveToken(data.accessToken);
            this.tokenService.saveUser(data);
    
            // this.loading = false;
            // this.isLoggedIn = true;
            
            // this.reloadPage();
          },
        //   err => {
        //     error => {
        //      this.alertService.error(error);
        //      this.loading = false;
        //               });
        //  }

    
    
    //   reloadPage() {
    //      window.location.reload()
    //   }

          )  }
    }