import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { AccountType } from './types/account.type';
import { AccountService } from './account.service';
import { CreateAccountInput } from './inputs/create-account.input';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/jwt.guard';

@Resolver(of => AccountType)
export class AccountResolver {
    constructor(private accountService: AccountService) {}

    @UseGuards(GraphQLAuthGuard)
    @Query(returns => AccountType)
    account(@Args('id') id: string) {
        return this.accountService.getAccount(id);
    }

    @UseGuards(GraphQLAuthGuard)
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
}
