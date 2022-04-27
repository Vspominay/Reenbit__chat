import { User } from './../../shared/models/user.model';
import { environment } from './../../../environments/environment';
import { AuthResponseData } from './../../shared/models/authResponseData.model';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError, BehaviorSubject } from 'rxjs';
import { httpOptions } from './httpOptions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User | null>(null);
    private tokenExpirationTimer: any;

    constructor(
        private http: HttpClient,
        private router: Router) { }


    signUp(email: string, password: string) {

        return this.http.post<AuthResponseData>(environment.URL_SignUp, { email: email, password: password, returnSecureToken: true }, httpOptions)
            .pipe(
                catchError(this.handleError),
                tap(response => {
                    this.handleAuth(response.email, response.localId, response.idToken, +response.expiresIn);
                })
            );
    }

    logIn(email: string, password: string) {
        return this.http.post<AuthResponseData>(environment.URL_SignIn, { email, password, returnSecureToken: true }, httpOptions)
            .pipe(
                catchError(this.handleError),
                tap(response => {
                    this.handleAuth(response.email, response.localId, response.idToken, +response.expiresIn);
                }));
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userDate');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }


    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpiration: string
        } = JSON.parse(localStorage.getItem('userDate') + "");

        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpiration)
        );


        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpiration).getTime() - new Date().getTime();
            this.autoLogOut(expirationDuration);
        }
    }
    autoLogOut(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuth(email: string, localId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, localId, token, expirationDate);
        this.user.next(user);
        this.autoLogOut(expiresIn * 1000);
        localStorage.setItem('userDate', JSON.stringify(user));
    }


    private handleError(error: HttpErrorResponse) {
        let errorMessage = "An unkown error occured!";

        if (!error.error || !error.error.error) {
            return throwError(errorMessage);
        }

        switch (error.error.error.message) {
            case "EMAIL_EXISTS":
                errorMessage = "this account is already registered";
                break;
            case "EMAIL_NOT_FOUND":
                errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted";
                break;
            case "INVALID_PASSWORD":
                errorMessage = "The password is invalid";
                break;
            case "USER_DISABLED":
                errorMessage = "The user account has been disabled by an administrator";
                break;
        }

        return throwError(errorMessage);
    }
}
