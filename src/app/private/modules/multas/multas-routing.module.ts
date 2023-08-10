import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultasComponent } from './multas.component';
import { MultasSuccessComponent } from './multas-success/multas-success.component';
import { MultasCancelComponent } from './multas-cancel/multas-cancel.component';

const routes: Routes = [
  {
    path: '',
    component: MultasComponent,
  },
  {
    path: 'success',
    component: MultasSuccessComponent
  },
  {
    path: 'cancel',
    component: MultasCancelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultasRoutingModule { }
