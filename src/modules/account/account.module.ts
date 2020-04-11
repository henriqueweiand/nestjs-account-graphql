import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
    imports: [TypeOrmModule.forFeature([Account]), RolesModule],
    providers: [AccountResolver, AccountService],
    exports: [AccountService],
})
export class AccountModule {}
