import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodType, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      const errorResult = result as { success: false; error: ZodError };
      const errorsOnString = errorResult.error.issues.map((issue) => {
        return `${issue.path.join('.')}: ${issue.message}`;
      });

      throw new BadRequestException(`${errorsOnString}`, {
        cause: new Error(),
        description: 'ZOD_VALIDATION',
      });
    }

    return result.data;
  }
}
