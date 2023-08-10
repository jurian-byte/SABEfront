import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMaterialesComponent } from './admin-materiales.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMaterialesComponent,
  }
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMaterialesRoutingModule { }
