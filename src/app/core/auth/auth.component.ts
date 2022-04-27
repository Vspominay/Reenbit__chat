import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData } from './../../shared/models/authResponseData.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;
    errorMessage: string | null = "";
    isLoginMode: boolean = false;

    private clsoeSub!: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;
        this.isLoading = true;


        if (this.isLoginMode) {
            authObs = this.authService.logIn(email, password);
        }
        else {
            authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe(resData => {
            this.isLoading = false;
            this.router.navigate(['/chat']);
        },
            errorMsg => {
                this.errorMessage = errorMsg;
                this.isLoading = false;
            });

        form.reset();
    }

    ngOnDestroy(): void {
        if (this.clsoeSub) {
            this.clsoeSub.unsubscribe();
        }
    }

    onHandleError() {
        this.errorMessage = null;
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
}
