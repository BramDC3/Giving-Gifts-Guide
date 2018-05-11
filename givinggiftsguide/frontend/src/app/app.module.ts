import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { UserModule } from './user/user.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { DialogflowService } from './chatbot/services';
import { BaseUrlInterceptor } from './http-interceptors/base-url.interceptors';
import { basehttpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent],
  imports: [
    BrowserModule,
    UserModule,
    ChatbotModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [basehttpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
