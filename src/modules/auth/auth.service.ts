import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from '../account/account.entity';
import { LoginInput } from './inputs/login.input';
import { LoginType } from './types/login';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
    ) {}

    async login(loginInput: LoginInput): Promise<LoginType | boolean> {
        const { email, password } = loginInput;
        const account = await this.accountRepository.findOne({
            email,
        });

        if (account && (await account.comparePassword(password))) {
            return { expireIn: 1000, token: 'abc.123.456' };
        }

        return false;
    }
}
