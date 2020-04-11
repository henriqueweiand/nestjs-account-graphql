import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from './account.entity';
import { CreateAccountInput } from './account.input';

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

    async createAccount(
        createAccountInput: CreateAccountInput,
    ): Promise<Account> {
        const { firstName, lastName } = createAccountInput;
        const account = await this.accountRepository.create({
            firstName,
            lastName,
        });

        return this.accountRepository.save(account);
    }
}
