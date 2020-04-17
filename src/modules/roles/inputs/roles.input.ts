import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class RolesInput {
    @IsNotEmpty()
    @Field()
    name: string;

    @IsUUID('4', { each: true })
    @Field(() => [ID], { defaultValue: [] })
    actions: string[];
}
