import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { AccountType } from './account.type';
import { AccountService } from './account.service';
import { CreateAccountInput, LoginAccountInput } from './inputs';
import { UnauthorizedException } from '@nestjs/common';

@Resolver(of => AccountType)
export class AccountResolver {
    constructor(private accountService: AccountService) {}

    @Query(returns => AccountType)
    account(@Args('id') id: string) {
        return this.accountService.getAccount(id);
    }

    @Query(returns => [AccountType])
    accounts() {
        return this.accountService.getAccounts();
    }

    @Mutation(returns => AccountType)
    createAccount(
        @Args('createAccountInput') createAccountInput: CreateAccountInput,
    ) {
        return this.accountService.createAccount(createAccountInput);
    }

    @Mutation(returns => AccountType)
    loginAccount(
        @Args('loginAccountInput') loginAccountInput: LoginAccountInput,
    ) {
        return this.accountService.loginAccount(loginAccountInput);
    }
}
