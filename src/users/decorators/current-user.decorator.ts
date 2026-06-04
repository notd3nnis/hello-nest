import { createParamDecorator } from '@nestjs/common';

export const CreateUser = createParamDecorator((data: any, context) => {
  const request = context.switchToHttp().getRequest();
});
