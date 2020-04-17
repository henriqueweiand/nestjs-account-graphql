import { InputType, Field, ID } from '@nestjs/graphql';
import {
    MinLength,
    IsEmail,
    IsNotEmpty,
    IsUUID,
    IsOptional,
} from 'class-validator';

@InputType()
export class UpdateAccountInput {
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

    @IsOptional()
    @MinLength(6)
    @Field({ nullable: true })
    password: string;

    @IsUUID('4', { each: true })
    @Field(() => [ID], { defaultValue: [] })
    roles: string[];
}
