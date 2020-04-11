import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Login')
export class LoginType {
    @Field()
    expiresIn: number;

    @Field()
    accessToken: string;
}
