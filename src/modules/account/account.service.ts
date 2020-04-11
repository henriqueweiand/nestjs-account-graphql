import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from './account.entity';
import { CreateAccountInput } from './inputs/create-account.input';

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
        return await this.accountRepository.findOne({ email });
    }

    public async getById(id: string): Promise<Account> {
        return await this.accountRepository.findOne({ id });
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
