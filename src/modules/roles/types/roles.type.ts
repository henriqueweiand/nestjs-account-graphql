import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Roles')
export class RolesType {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;
}
