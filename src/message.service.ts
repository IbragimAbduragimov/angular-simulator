import { Injectable } from '@angular/core';
import { IMessage } from './app/interfaces/IMessage';
import { Message } from './enums/Message';
import { BehaviorSubject, filter, map, Subject } from 'rxjs';


@Injectable()
export class MessageService {

  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
 
  messages$ = this.messagesSubject.asObservable();

  addMessage(type: Message, text: string): void {
    const currentMessage: IMessage = { text: text, type: type };
    const messageList = this.messagesSubject.getValue();
    this.messagesSubject.next([currentMessage, ...messageList]);

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
    const messages: IMessage[] = this.messagesSubject.value;
    const message: IMessage[] = messages.filter((messageToRemove: IMessage) => messageToRemove !== currentMessage);
    this.messagesSubject.next(message);
  }
}