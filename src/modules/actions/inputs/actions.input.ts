import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class ActionsInput {
    @IsNotEmpty()
    @Field()
    name: string;

    @IsOptional()
    @Field({ nullable: true })
    url: string;

    @IsOptional()
    @Field({ nullable: true })
    method: string;

    @IsOptional()
    @Field({ nullable: true })
    description: string;
}
