import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ActionsType } from './types/actions.type';
import { ActionsService } from './actions.service';
import { CreateActionsInput } from './inputs/create-actions.input';
import { GraphQLAuthGuard } from '../auth/jwt.guard';

@Resolver(of => ActionsType)
export class ActionsResolver {
    constructor(private actionsService: ActionsService) {}

    @UseGuards(GraphQLAuthGuard)
    @Query(returns => ActionsType)
    role(@Args('id') id: string) {
        return this.actionsService.getAction(id);
    }

    @UseGuards(GraphQLAuthGuard)
    @Query(returns => [ActionsType])
    actions() {
        return this.actionsService.getActions();
    }

    @Mutation(returns => ActionsType)
    createActions(
        @Args('createActionsInput') createActionsInput: CreateActionsInput,
    ) {
        return this.actionsService.create(createActionsInput);
    }
}
