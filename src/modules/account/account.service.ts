import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from './account.entity';
import { CreateAccountInput } from './inputs/create-account.input';
import { Roles } from '../roles/roles.entity';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
    ) {}

    async getAccounts(): Promise<Account[]> {
        return this.accountRepository.find({ relations: ['roles'] });
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

    async create(
        createAccountInput: Omit<CreateAccountInput, 'roles'>,
    ): Promise<Account> {
        const { firstName, lastName, email, password } = createAccountInput;
        const account = this.accountRepository.create({
            firstName,
            lastName,
            email,
            password,
        });

        return await this.accountRepository.save(account);
    }

    async assign(account: Account, roles: Roles[]): Promise<boolean> {
        try {
            account.roles = Promise.resolve(roles);
            await this.accountRepository.save(account);

            return true;
        } catch (e) {
            return false;
        }
    }
}
