import { AfterContentInit, Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { LoadingService } from '../../services/utils/loading.service';
import { Subject, Subscription } from 'rxjs';

@Directive({
    selector: '[appBlockClick]'
})
export class BlockClickDirective implements OnInit, OnDestroy, AfterViewInit {
    private clicks = new Subject();
    loadingSubscription: Subscription = new Subscription();
    originalContent: string = '';
    isWorking: boolean = false;
    @Input() changeContent: boolean = true;
    constructor(private el: ElementRef,
        private loadingService: LoadingService) {
    }

    ngOnInit() {
        this.loadingSubscription = this.loadingService.getLoadingStatus().subscribe((isWorking) => {
            this.isWorking = isWorking;
            this.setContent();
        });

    }
    setContent() {
        if (this.isWorking) {
            this.el.nativeElement.disabled = true;
            if (this.changeContent) {
                this.el.nativeElement.style.display = 'none';
                this.el.nativeElement.style.cursor = 'wait';
            };
        } else {
            if (this.changeContent) this.el.nativeElement.style.display = '';
            this.el.nativeElement.disabled = false;
        }
    }

    ngAfterViewInit() {
        this.isWorking = this.loadingService.loading;
        if (this.changeContent) this.originalContent = this.el.nativeElement.innerHTML;
        // this.setContent();

    }

    ngOnDestroy() {
    }

    @HostListener('click', ['$event'])
    clickEvent(event: any) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.isWorking)
            this.clicks.next(event);

    }
}
