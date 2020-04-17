import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Actions')
export class ActionsType {
    @Field(type => ID)
    id: string;

    @Field()
    url: string;

    @Field()
    method: string;

    @Field()
    description: string;
}
