import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';
import { Roles } from './roles.entity';
import { ActionsModule } from '../actions/actions.module';

@Module({
    imports: [TypeOrmModule.forFeature([Roles]), ActionsModule],
    providers: [RolesResolver, RolesService],
    exports: [RolesService],
})
export class RolesModule {}
