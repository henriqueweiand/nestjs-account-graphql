import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Account')
export class AccountType {
  @Field(type => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
