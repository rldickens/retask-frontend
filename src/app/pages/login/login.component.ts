﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '@app/_models';

import { AlertService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    user: User;
    subscription: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngOnDestroy() {
        // Only need to unsubscribe if its a multi event Observable
        //this.subscription.unsubscribe();
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() { }
    async login() {
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        // if the user is Guest and password = password allow them in as a guest
        // but they have no db access
        if (this.f.username.value === 'Guest' && this.f.password.value === 'password') {
            this.user = this.authenticationService.guestLogin(this.f.username.value, this.f.password.value);
        } else {
            this.loading = true;
            this.user = await this.authenticationService.login(this.f.username.value, this.f.password.value)
        }

        // if the user.id is not null
        if (this.user.username) {
            this.router.navigate([this.returnUrl]);
        } else {
            this.alertService.error("error");
            this.loading = false;
        }

        this.loading = false;
    }
}
