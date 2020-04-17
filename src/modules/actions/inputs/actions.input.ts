import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ActionsInput {
    @IsNotEmpty()
    @Field()
    name: string;
}
