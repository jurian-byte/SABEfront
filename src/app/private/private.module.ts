import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { ButtonModule } from 'primeng/button';
import { AppLayoutModule } from './layout/app.layout.module';
import { CoreModule } from './core/core.module';
import {DividerModule} from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SidebarModule } from 'primeng/sidebar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {PasswordModule} from 'primeng/password';
import {CardModule} from 'primeng/card';
import {MessageModule} from 'primeng/message';
import {InputMaskModule} from 'primeng/inputmask';




@NgModule({
    declarations: [
  ],
    imports: [
        CommonModule,
        PrivateRoutingModule,
        ButtonModule,
        AppLayoutModule,
        CoreModule,
        BreadcrumbModule,
        DividerModule,
        TableModule,
        FileUploadModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        FormsModule,
        ReactiveFormsModule,
        SidebarModule,
        AutoCompleteModule,
        PasswordModule,
        CardModule,
        MessageModule,
        InputMaskModule,
      
    ]
})
export class PrivateModule { }
