import { ChatbotComponent } from "./chatbot/chatbot.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthenticationService } from "../user/authentication.service";
import { AuthGuardService } from "../user/auth-guard.service";
import { MessageListComponent, MessageItemComponent, MessageFormComponent } from "./components";
import { DialogflowService } from "./services";
import { basehttpInterceptorProviders } from "../http-interceptors";

const routes = [
    { path: 'chatbot', component: ChatbotComponent }
];

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        MessageListComponent,
        MessageItemComponent,
        MessageFormComponent,
        ChatbotComponent
    ],
    providers: [
        basehttpInterceptorProviders,
        AuthenticationService,
        AuthGuardService,
        DialogflowService
    ],
    exports: [
    ]
})
export class ChatbotModule { }