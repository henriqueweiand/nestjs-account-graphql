import {
    Resolver,
    Query,
    Mutation,
    Args,
    ResolveField,
    Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Account } from './account.entity';
import { AccountType } from './types/account.type';
import { AccountService } from './account.service';
import { CreateAccountInput } from './inputs/create-account.input';
import { GraphQLAuthGuard } from '../auth/jwt.guard';
import { RolesService } from '../roles/roles.service';

@Resolver(of => AccountType)
export class AccountResolver {
    constructor(
        private accountService: AccountService,
        private rolesService: RolesService,
    ) {}

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
    async createAccount(
        @Args('createAccountInput') createAccountInput: CreateAccountInput,
    ) {
        const { roles, ...accountData } = createAccountInput;
        const account = await this.accountService.create(accountData);

        if (roles) {
            const assignIn = await this.rolesService.getMany(roles);
            this.accountService.assign(account, assignIn);
        }

        return account;
    }
}
