import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuzonComponent } from './core/buzon/buzon.component';
import { PerfilComponent } from './core/perfil/perfil.component';
import { LayoutComponent } from './layout/layout.component';
import { PlaceholderComponent } from './layout/placeholder/placeholder.component';



const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: PlaceholderComponent },
            { path: 'buzon', component: BuzonComponent },
            { path: 'perfil', component: PerfilComponent },
            { path: 'prestamos', loadChildren: () => import('./modules/prestamos/prestamos.module').then(m => m.PrestamosModule) },
            { path: 'multas', loadChildren: () => import('./modules/multas/multas.module').then(m => m.MultasModule) },
            { path: 'busqueda', loadChildren: () => import('./modules/busqueda/busqueda.module').then(m => m.BusquedaModule) },
        
            { path: 'fila-virtual', loadChildren: () => import('./modules/fila-virtual/fila-virtual.module').then(m => m.FilaVirtualModule) },
            { path: 'materiales', loadChildren: () => import('./modules/materiales/materiales.module').then(m => m.MaterialesModule) },
          
          
            // Admin
            { path: 'admin-usuarios', loadChildren: () => import('./modules/admin/admin-usuarios/admin-usuarios.module').then(m => m.AdminUsuariosModule) },
            { path: 'admin-libros', loadChildren: () => import('./modules/admin/admin-libros/admin-libros.module').then(m => m.AdminLibrosModule) },
            { path: 'admin-materiales', loadChildren: () => import('./modules/admin/admin-materiales/admin-materiales.module').then(m => m.AdminMaterialesModule) },
            { path: 'admin-encuestas', loadChildren: () => import('./modules/admin/admin-encuestas/admin-encuestas.module').then(m => m.AdminEncuestasModule) },
            { path: 'admin-multas', loadChildren: () => import('./modules/admin/admin-multas/admin-multas.module').then(m => m.AdminMultasModule) },           
            { path: 'admin-prestamos', loadChildren: () => import('./modules/admin/admin-prestamos/admin-prestamos.module').then(m => m.AdminPrestamosModule) },

            // Super Admin

            { path: 'super-admin-admins', loadChildren: () => import('./modules/superAdmin/super-admin-admins/super-admin-admins.module').then(m => m.SuperAdminAdminsModule) },


        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrivateRoutingModule { }
