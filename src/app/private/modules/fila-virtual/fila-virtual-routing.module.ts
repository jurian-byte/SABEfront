import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilaVirtualComponent } from './fila-virtual.component';

const routes: Routes = [
{
    path: '',
    component: FilaVirtualComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilaVirtualRoutingModule { }
