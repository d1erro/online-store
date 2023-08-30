import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Message, MessageSchema} from "./schemas/message.schema";

@Module({
  providers: [MessagesService],
  controllers: [MessagesController],
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ]
})
export class MessagesModule {}
