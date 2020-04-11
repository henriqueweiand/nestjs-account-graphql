import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from '../account/account.entity';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AccountService } from '../account/account.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [TypeOrmModule.forFeature([Account])],
    providers: [AuthResolver, AuthService, AccountService, JwtStrategy],
})
export class AuthModule {}
