import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AccountType } from './types/account.type';
import { GraphQLAuthGuard } from '../auth/jwt.guard';
import { RolesService } from '../roles/roles.service';
import { AccountService } from './account.service';

import { CreateAccountInput } from './inputs/create-account.input';
import { UpdateAccountInput } from './inputs/update-account.input';

@Resolver(() => AccountType)
export class AccountResolver {
    constructor(
        private accountService: AccountService,
        private rolesService: RolesService,
    ) {}

    @UseGuards(GraphQLAuthGuard)
    @Query(() => AccountType)
    account(@Args('id') id: string) {
        return this.accountService.getAccount(id);
    }

    @UseGuards(GraphQLAuthGuard)
    @Query(() => [AccountType])
    accounts() {
        return this.accountService.getAccounts();
    }

    @Mutation(() => AccountType)
    async createAccount(
        @Args('createAccountInput') createAccountInput: CreateAccountInput,
    ) {
        const { roles, ...accountData } = createAccountInput;
        const account = await this.accountService.create(accountData);

        if (roles.length) {
            const assignIn = await this.rolesService.getMany(roles);
            this.accountService.assign(account, assignIn);
        }

        return account;
    }

    @UseGuards(GraphQLAuthGuard)
    @Mutation(() => AccountType)
    async updateAccount(
        @Args('id') id: string,
        @Args('updateAccountInput') updateAccountInput: UpdateAccountInput,
    ) {
        const { roles, ...accountData } = updateAccountInput;
        const account = await this.accountService.getAccount(id);
        await this.accountService.update(account, accountData);

        if (roles.length) {
            const assignIn = await this.rolesService.getMany(roles);
            this.accountService.assign(account, assignIn);
        }

        return account;
    }
}
