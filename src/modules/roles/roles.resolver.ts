import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { RolesType } from './types/roles.type';
import { RolesService } from './roles.service';
import { CreateRolesInput } from './inputs/create-roles.input';
import { GraphQLAuthGuard } from '../auth/jwt.guard';

@Resolver(of => RolesType)
export class RolesResolver {
    constructor(private rolesService: RolesService) {}

    @UseGuards(GraphQLAuthGuard)
    @Query(returns => RolesType)
    role(@Args('id') id: string) {
        return this.rolesService.getRole(id);
    }

    @UseGuards(GraphQLAuthGuard)
    @Query(returns => [RolesType])
    roles() {
        return this.rolesService.getRoles();
    }

    @Mutation(returns => RolesType)
    createRoles(@Args('createRolesInput') createRolesInput: CreateRolesInput) {
        return this.rolesService.create(createRolesInput);
    }
}
