import { NgModule } from '@angular/core';
import { StripeModule } from 'stripe-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { AuthGuard } from './utils/guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotfoundComponent } from './public/pages/notfound/notfound.component';
import { SessionWatcher } from './utils/session/session-watcher.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,

    ],
    imports: [
        AppRoutingModule, BrowserAnimationsModule, HttpClientModule, StripeModule.forRoot('pk_test_51MzrfzDmeAo13sieAEyRT0c9pvVSq5cYCewWWdrClMuEwZRvgfSaYg2j4UhOTjgeDuWzRkkTTElV9MxquICQfCS000IH4VNcC9'), ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})
    ],
    providers: [
        AuthGuard,
        LocalStorageService,
        { provide: HTTP_INTERCEPTORS, useClass: SessionWatcher, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
