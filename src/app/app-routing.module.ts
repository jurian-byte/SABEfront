import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utils/guards/auth.guard';



const routes: Routes = [

    { path: 'login', loadChildren: () => import('./public/login/login.module').then(m => m.LoginModule), data: { title: 'Inicio de sesión' } },
    { path: 'inicio', loadChildren: () => import('./private/private.module').then(m => m.PrivateModule), data: { title: 'Inicio de sesión' }, canActivateChild: [AuthGuard] },
    { path: 'registro', loadChildren: () => import('./public/registro/registro.module').then(m => m.RegistroModule), data: { title: 'Registro' } },

    { path: '404', loadChildren: () => import('./public/pages/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: 'preguntas-frecuentes', loadChildren: () => import('./public/pages/preguntas-frecuentes/preguntas-frecuentes.module').then(m => m.PreguntasFrecuentesModule) },
    {path :'', redirectTo: 'login', pathMatch: 'full'},
    { path: '**', redirectTo: '404' },

    
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
