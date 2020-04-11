import {
    Resolver,
    Query,
    Mutation,
    Args,
    ResolveField,
    Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AccountType } from './types/account.type';
import { AccountService } from './account.service';
import { CreateAccountInput } from './inputs/create-account.input';
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
        return this.accountService.create(createAccountInput);
    }

    @ResolveField()
    async roles(@Parent() account: Account) {
        console.log(account);
        return [];
    }
}
