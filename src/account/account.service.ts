import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from './account.entity';
import { CreateAccountInput, LoginAccountInput } from './inputs';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
    ) {}

    async getAccounts(): Promise<Account[]> {
        return this.accountRepository.find();
    }

    async getAccount(id: string): Promise<Account> {
        return this.accountRepository.findOne({ id });
    }

    public async getByEmail(email: string): Promise<Account> {
        return await this.accountRepository.findOne({ email: email });
    }

    async loginAccount(
        loginAccountInput: LoginAccountInput,
    ): Promise<Account | boolean> {
        const { email, password } = loginAccountInput;
        const account = await this.accountRepository.findOne({
            email,
        });

        if (account && (await account.comparePassword(password))) {
            return account;
        }

        return false;
    }

    async createAccount(
        createAccountInput: CreateAccountInput,
    ): Promise<Account> {
        const { firstName, lastName, email, password } = createAccountInput;
        const account = await this.accountRepository.create({
            firstName,
            lastName,
            email,
            password,
        });

        return this.accountRepository.save(account);
    }
}
