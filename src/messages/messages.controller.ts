import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  getListMessage() {}

  @Post()
  createListMessages(@Body() body: any) {
    console.log(body);
  }

  @Get('/:id')
  gemessage(@Param('id') id: string) {}
}
