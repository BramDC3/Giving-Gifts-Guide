import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { BaseUrlInterceptor } from "./base-url.interceptors";
import { AuthenticationInterceptor } from "./AuthenticationInterceptor";

export const basehttpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: BaseUrlInterceptor,
    multi: true
  }
];

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }
];