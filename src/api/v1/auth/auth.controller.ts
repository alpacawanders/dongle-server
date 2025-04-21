import { Controller, Post, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // authorization -> BasicToken
    @Post('register')
    registerUser(@Headers('authorization') token: string) {
        return this.authService.registerUser(token);
    }

    @Post('login')
    loginUser(@Headers('authorization') token: string) {
        return this.authService.login(token);
    }
}
