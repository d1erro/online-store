import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Message } from "./schemas/message.schema";
import { Model } from "mongoose";
import { CreateMessageDto } from "./dto/create-message.dto";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageRepository: Model<Message>,
  ) {}

  async createMessage(dto: CreateMessageDto) {
    return await this.messageRepository.create({ ...dto });
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageRepository
      .find()
      .sort({ _id: -1 })
      .populate("user", "-password")
      .exec();
  }

  async deleteMessage(id: string) {
    return this.messageRepository.findByIdAndDelete(id);
  }
}
