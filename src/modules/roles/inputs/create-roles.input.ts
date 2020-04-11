import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRolesInput {
    @IsNotEmpty()
    @Field()
    name: string;
}
