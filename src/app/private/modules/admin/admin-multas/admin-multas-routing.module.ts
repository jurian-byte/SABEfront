import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMultasComponent } from './admin-multas.component';

const routes: Routes = [
  { path: '',  
  component: AdminMultasComponent,},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMultasRoutingModule { }
