import { Injectable } from '@angular/core';
import { IMessage } from './app/interfaces/IMessage';
import { Message } from './enums/Message';

@Injectable()
export class MessageService {

  messages: IMessage[] = []

  addMessage(type: Message, text: string): void {
    const currentMessage = {type: type, text: text}
    this.messages = [currentMessage, ...this.messages];
    

    setTimeout(() => {
      this.closeMessage(currentMessage);
    }, 5000);
  }

  closeMessage(currentMessage: IMessage): void {
    this.messages = this.messages.filter((messageToRemove: IMessage) => messageToRemove !== currentMessage);
  }

};