import { HttpException, Catch, ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';

@Catch(HttpException) // Esse cara vai pegar apenas erros da classe HttpException
export class HttpExceptionFilter implements GqlExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);

        return {
            ...gqlHost,
            id: undefined,
            extras: {
                message: `That's my custom error message`,
                someOtherData: 'The sky is the limit',
            },
        };
    }
}
