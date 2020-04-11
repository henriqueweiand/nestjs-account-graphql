import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Login')
export class LoginType {
    @Field()
    expireIn: number;

    @Field()
    token: string;
}
