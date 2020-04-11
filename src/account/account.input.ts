import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateAccountInput {
    @MinLength(3)
    @Field()
    firstName: string;

    @Field()
    lastName: string;
}
