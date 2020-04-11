import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import { Account } from '../account/account.entity';
import { LoginInput } from './inputs/login.input';
import { LoginType } from './types/login';
import { JwtPayload } from './interface/token.interface';
import { AccountService } from '../account/account.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
        private accountService: AccountService,
    ) {}

    async validateToken(payload: JwtPayload): Promise<boolean> {
        return !!(await this.accountService.getById(payload.id));
    }

    async login(loginInput: LoginInput): Promise<LoginType> {
        const { email, password } = loginInput;
        const account = await this.accountRepository.findOne({
            email,
        });

        const expiresIn = parseInt(process.env.JWT_EXPIRES_IN, 10);
        const payload: JwtPayload = {
            id: account.id,
            email,
        };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn,
        });

        if (account && (await account.comparePassword(password))) {
            return { expiresIn, accessToken };
        }
    }
}
