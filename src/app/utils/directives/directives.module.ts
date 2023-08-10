import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockClickDirective } from './block-click.directive';
import { IsDisabledDirective } from './is-disabled.directive';



@NgModule({
    declarations: [BlockClickDirective, IsDisabledDirective],
    imports: [
        CommonModule
    ],
    exports: [BlockClickDirective, IsDisabledDirective]
})
export class DirectivesModule { }
