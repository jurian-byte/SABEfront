import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appIsDisabled]'
})
export class IsDisabledDirective implements OnInit {
    @Input() appIsDisabled: boolean = true;
    @Input() valido: boolean = true;
    constructor(private el: ElementRef,
      private renderer: Renderer2) {
    }

    ngOnInit() {
      if (this.appIsDisabled) {
        this.renderer.setAttribute(this.el.nativeElement, 'disabled', '', null);
        this.el.nativeElement.classList.add('campo-consulta');
      }
    }
    
}
