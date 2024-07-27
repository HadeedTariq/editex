import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { CustomException } from './custom.exception';
export declare class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: CustomException, host: ArgumentsHost): void;
}
