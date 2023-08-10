import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPrestamosComponent } from './admin-prestamos.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPrestamosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPrestamosRoutingModule { }
