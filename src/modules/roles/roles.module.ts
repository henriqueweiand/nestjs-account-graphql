import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';
import { Roles } from './roles.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Roles])],
    providers: [RolesResolver, RolesService],
    exports: [RolesService],
})
export class RolesModule {}
