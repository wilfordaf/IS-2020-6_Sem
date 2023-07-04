import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    ForbiddenException
} from '@nestjs/common';
import { Response } from 'express';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
    catch(exception: ForbiddenException, host: ArgumentsHost) {
        host.switchToHttp().getResponse<Response>().redirect('/login');
    }
}