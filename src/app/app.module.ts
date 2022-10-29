import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { AuthConfigModule } from "./auth-config.module";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        CoreModule,
        AppRoutingModule,
        AuthConfigModule,
        HttpClientModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
