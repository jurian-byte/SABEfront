import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsuariosComponent } from '../../admin/admin-usuarios/admin-usuarios.component';
import { SuperAdminAdminsComponent } from './super-admin-admins.component';

const routes: Routes = [
  {
    path:'',
    component: SuperAdminAdminsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminAdminsRoutingModule { }
