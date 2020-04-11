import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from '../account/account.entity';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Account])],
    providers: [AuthResolver, AuthService],
})
export class AuthModule {}
