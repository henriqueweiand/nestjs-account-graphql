import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Actions')
export class ActionsType {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;
}
