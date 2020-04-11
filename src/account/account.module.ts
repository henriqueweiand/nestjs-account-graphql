import { Module } from '@nestjs/common';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Account])],
    providers: [AccountResolver, AccountService],
})
export class AccountModule {}
