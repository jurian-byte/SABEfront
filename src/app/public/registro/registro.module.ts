import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { RegistroComponent } from './registro.component';
import { RegistroRoutingModule } from './registro-routing.module';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputNumberModule } from 'primeng/inputnumber';
import  {DropdownModule} from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [RegistroComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RegistroRoutingModule,
    MessageModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    InputNumberModule,
    DropdownModule,
    ToastModule,
    DialogModule

  ],
  exports: [RegistroComponent]
})
export class RegistroModule { }
