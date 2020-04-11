import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    AccountModule,
  ],
})
export class AppModule {}
