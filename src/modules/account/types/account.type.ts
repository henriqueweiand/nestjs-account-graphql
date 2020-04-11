import { ObjectType, Field, ID } from '@nestjs/graphql';
import { RolesType } from 'src/modules/roles/types/roles.type';

@ObjectType('Account')
export class AccountType {
    @Field(type => ID)
    id: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field(type => [ID], { defaultValue: [] })
    roles?: string[];
}
