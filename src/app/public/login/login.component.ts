import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/public/login.service';
import { ClientSession } from 'src/app/utils/session/session.component';
import { LayoutService } from 'src/app/services/layout/app.layout.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService]
})
export class LoginComponent implements OnInit {

    password!: string;
    displayRequest: boolean = false;
    displayRequestSended: boolean = false;

    formLogin!: FormGroup;
    formRecuperar!: FormGroup;

    loading: boolean = false;

    constructor(
        private loginService: LoginService,
        private session: ClientSession,
        private router: Router,
        public layoutService: LayoutService,
        private messageService: MessageService
    ) {
        this.formRecuperar = new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email])
        });

        this.formLogin = new FormGroup({
            email: new FormControl("", [Validators.required]),
            password: new FormControl("", [Validators.required])
        });
    }

    ngOnInit(): void {

    }

    loggin() {
        let password = this.formLogin.value.password;
        let email = this.formLogin.value.email;
        this.loading = true;
        this.loginService.login(email, password).subscribe({
            next: (res) => {
                this.session.loginOK(res);
                this.router.navigate(["/inicio"]);
                this.loading = false;
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario y/o contraseña incorrectos' });
                this.loading = false;
            }
        });
    }

    onSubmitRecuperar() {
        this.formRecuperar.markAllAsTouched();
        if (this.formRecuperar.invalid) {
            return;
        }

        this.loading = true;
        this.loginService.requestPasswordReset(this.formRecuperar.get('email')?.value).subscribe({
            next: (res) => {
                this.displayRequest = false;
                this.displayRequestSended = true;
                this.formRecuperar.reset();
                this.formRecuperar.markAsUntouched();
                this.loading = false;
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Lo sentimos, por favor intenta mas tarde' });
                this.loading = false;
            }
        });
    }

    onSubmitLogin() {
        this.formLogin.markAllAsTouched();
        if (this.formLogin.invalid) {
            return;
        }
        this.loggin();
    }
}
