import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { MessagesService } from "./messages.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Message } from "./schemas/message.schema";

@ApiTags("Messages")
@Controller("/messages")
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @ApiOperation({ summary: "Create message" })
  @ApiResponse({ status: 200, type: Message })
  @Post()
  createPost(@Body() dto: CreateMessageDto) {
    return this.messagesService.createMessage(dto);
  }

  @ApiOperation({ summary: "Get all messages" })
  @ApiResponse({ status: 200, type: [Message] })
  @Get()
  getAllMessages() {
    return this.messagesService.getAllMessages();
  }

  @ApiOperation({ summary: "Delete message" })
  @ApiResponse({ status: 200 })
  @Delete(":id")
  deleteMessage(@Param("id") id: string) {
    return this.messagesService.deleteMessage(id);
  }
}
