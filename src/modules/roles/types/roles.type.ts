import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ActionsType } from 'src/modules/actions/types/actions.type';

@ObjectType('Roles')
export class RolesType {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field(() => [ActionsType], { nullable: true })
    actions: ActionsType[];
}
