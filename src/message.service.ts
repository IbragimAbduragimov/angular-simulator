import { Injectable } from '@angular/core';
import { IMessage } from './app/interfaces/IMessage';
import { Message } from './enums/Message';
import { BehaviorSubject, filter, map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);

  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();

  addMessage(type: Message, text: string): void {
    const currentMessage: IMessage = { text: text, type: type };
    const messageList: IMessage[] = this.messagesSubject.getValue();
    this.messagesSubject.next([currentMessage, ...messageList]);

    setTimeout(() => {
      this.closeMessage(currentMessage);
    }, 5000);
  }

  showWarn(content: string): void {
    this.addMessage(Message.WARN, content);
  }

  showError(content: string): void {
    this.addMessage(Message.ERROR, content);
  }

  showSuccess(content: string): void {
    this.addMessage(Message.SUCCESS, content);
  }

  showInfo(content: string): void {
    this.addMessage(Message.INFO, content);
  }

  closeMessage(currentMessage: IMessage): void {
    const messages: IMessage[] = this.messagesSubject.value;
    const message: IMessage[] = messages.filter(
      (messageToRemove: IMessage) => messageToRemove !== currentMessage,
    );
    this.messagesSubject.next(message);
  }
}
