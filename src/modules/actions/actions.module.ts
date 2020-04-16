import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActionsResolver } from './actions.resolver';
import { ActionsService } from './actions.service';
import { Actions } from './actions.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Actions])],
    providers: [ActionsResolver, ActionsService],
    exports: [ActionsService],
})
export class ActionsModule {}
