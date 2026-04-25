import { Injectable } from '@angular/core';
import { IMessage } from './app/interfaces/IMessage';
import { Message } from './enums/Message';

@Injectable()
export class MessageService {


  messages: IMessage[] = [];

   addMessage(type: Message, text: string): void {
    const currentMessage: IMessage = { text: text, type: type };
    this.messages = [currentMessage, ...this.messages];
    

    setTimeout(() => {
      this.closeMessage(currentMessage);
    }, 5000);
  }

  showWarn(): void {
    this.addMessage(Message.WARN,'Программа не доступна');
  }

  showError(): void {
    this.addMessage(Message.ERROR, 'Материалы недоступны');
  }

  showSuccess(): void {
    this.addMessage(Message.SUCCESS,'Стоимость отправлена на почту');
  }

  showInfo(): void {
    this.addMessage(Message.INFO, 'Стоимость отправлена на почту');
  }

  closeMessage(currentMessage: IMessage): void {
    this.messages = this.messages.filter((messageToRemove: IMessage) => messageToRemove !== currentMessage);
  }

}