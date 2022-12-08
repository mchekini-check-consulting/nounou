import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.routing';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {OAuthModule} from "angular-oauth2-oidc";
import {BrowserModule} from "@angular/platform-browser";
import { ToastrModule } from 'ngx-toastr';
import {HttpRequestInterceptor} from "./core/interceptors/httpRequestInerceptor";

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        CoreModule,
        AppRoutingModule,
        OAuthModule.forRoot(),
        ReactiveFormsModule,
        ToastrModule.forRoot()
    ],
    declarations: [
        AppComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
