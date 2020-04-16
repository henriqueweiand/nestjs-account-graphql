import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateActionsInput {
    @IsNotEmpty()
    @Field()
    name: string;
}
