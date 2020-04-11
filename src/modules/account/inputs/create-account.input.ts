import { InputType, Field, ID } from '@nestjs/graphql';
import { MinLength, IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateAccountInput {
    @MinLength(3)
    @Field()
    firstName: string;

    @IsNotEmpty()
    @Field()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @Field()
    email: string;

    @MinLength(6)
    @Field()
    password: string;

    // @IsUUID('4', { each: true })
    @Field(() => [ID], { defaultValue: [] })
    roles: string[];
}
