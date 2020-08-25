import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthzGuard } from './authz.guard';

export function Scoped(resourceInfo: { resourceId: string } = { resourceId: 'id' }): any {
  return applyDecorators(
    SetMetadata('scoped', true),
    SetMetadata('resourceId', resourceInfo?.resourceId),
    UseGuards(AuthzGuard)
  );
}