import { AuthGuard } from './guards/auth.gard';
import { AuthService } from './auth/auth.service';
import { UserGuard } from './guards/user.gard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token/token-interceptor';

export const AuthModule = [
    AuthGuard,
    AuthService,
    UserGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];
