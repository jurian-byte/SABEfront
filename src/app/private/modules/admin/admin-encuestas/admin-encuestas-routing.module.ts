import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEncuestasComponent } from './admin-encuestas.component';

const routes: Routes = [
  {
    path: '',
    component: AdminEncuestasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEncuestasRoutingModule { }
