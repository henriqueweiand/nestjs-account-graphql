import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { LoginType } from './types/login.type';
import { AuthService } from './auth.service';
import { LoginInput } from './inputs/login.input';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(returns => LoginType)
    login(@Args('loginInput') loginInput: LoginInput) {
        return this.authService.login(loginInput);
    }
}
