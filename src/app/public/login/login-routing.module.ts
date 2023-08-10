import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';


const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        children: []
    },
    //{ path: 'recuperar-cuenta', component: RecuperarCuentaComponent },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
