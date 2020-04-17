import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { RolesType } from './types/roles.type';
import { RolesService } from './roles.service';
import { RolesInput } from './inputs/roles.input';
import { GraphQLAuthGuard } from '../auth/jwt.guard';
import { ActionsService } from '../actions/actions.service';

@Resolver(() => RolesType)
export class RolesResolver {
    constructor(
        private rolesService: RolesService,
        private actionsService: ActionsService,
    ) {}

    @UseGuards(GraphQLAuthGuard)
    @Query(() => RolesType)
    role(@Args('id') id: string) {
        return this.rolesService.getRole(id);
    }

    @UseGuards(GraphQLAuthGuard)
    @Query(() => [RolesType])
    roles() {
        return this.rolesService.getRoles();
    }

    @UseGuards(GraphQLAuthGuard)
    @Mutation(() => RolesType)
    async createRole(@Args('rolesInput') rolesInput: RolesInput) {
        const { actions, ...roleData } = rolesInput;
        const role = await this.rolesService.create(roleData);

        if (actions.length) {
            const assignIn = await this.actionsService.getMany(actions);
            this.rolesService.assign(role, assignIn);
        }

        return role;
    }

    @UseGuards(GraphQLAuthGuard)
    @Mutation(() => RolesType)
    async updateRole(
        @Args('id') id: string,
        @Args('rolesInput') rolesInput: RolesInput,
    ) {
        const { actions, ...roleData } = rolesInput;
        const role = await this.rolesService.getById(id);
        await this.rolesService.update(role, roleData);

        if (actions.length) {
            const assignIn = await this.actionsService.getMany(actions);
            this.rolesService.assign(role, assignIn);
        }

        return role;
    }

    @UseGuards(GraphQLAuthGuard)
    @Mutation(() => RolesType)
    async deleteRole(@Args('id') id: string) {
        const role = await this.rolesService.getById(id);
        await this.rolesService.delete(role);

        return role;
    }
}
