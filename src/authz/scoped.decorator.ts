import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthzGuard } from './authz.guard';

export function Scoped(): any {
  return applyDecorators(
    SetMetadata('scoped', true),
    UseGuards(AuthzGuard)
  );
}