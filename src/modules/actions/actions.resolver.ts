import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ActionsType } from './types/actions.type';
import { ActionsService } from './actions.service';
import { ActionsInput } from './inputs/actions.input';
import { GraphQLAuthGuard } from '../auth/jwt.guard';

@Resolver(() => ActionsType)
export class ActionsResolver {
    constructor(private actionsService: ActionsService) {}

    @UseGuards(GraphQLAuthGuard)
    @Query(() => ActionsType)
    role(@Args('id') id: string) {
        return this.actionsService.getAction(id);
    }

    @UseGuards(GraphQLAuthGuard)
    @Query(() => [ActionsType])
    actions() {
        return this.actionsService.getActions();
    }

    @UseGuards(GraphQLAuthGuard)
    @Mutation(() => ActionsType)
    createAction(@Args('actionsInput') actionsInput: ActionsInput) {
        return this.actionsService.create(actionsInput);
    }

    @UseGuards(GraphQLAuthGuard)
    @Mutation(() => ActionsType)
    async updateAction(
        @Args('id') id: string,
        @Args('actionsInput') actionsInput: ActionsInput,
    ) {
        const role = await this.actionsService.getById(id);
        await this.actionsService.update(role, actionsInput);

        return role;
    }

    @UseGuards(GraphQLAuthGuard)
    @Mutation(() => ActionsType)
    async deleteAction(@Args('id') id: string) {
        const action = await this.actionsService.getById(id);
        await this.actionsService.delete(action);

        return action;
    }
}
